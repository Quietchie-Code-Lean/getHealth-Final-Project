import prisma from "../config/prisma.js";

import {
  timeToMinutes,
  minutesToDate,
  dateToTimeString,
  parseAppointmentDate,
  getWeekday,
} from "../utils/dateTime.utils.js";

// ============================================================
// AVAILABILITY HELPERS
// ============================================================

// Finds the active availability configured for a professional on a given date.
const getProfessionalAvailability = async (professionalId, appointmentDate) => {
  // Determine which weekday corresponds to the requested date.
  const weekday = getWeekday(appointmentDate);

  // Search for an active availability configuration.
  const availability = await prisma.availability.findFirst({
    where: {
      professionalProfileId: professionalId,
      weekday,
      availableSlot: true,
    },
  });

  // Return the availability found for the requested day.
  return availability;
};

// Validates that a requested start time belongs to a professional availability.
const validateAppointmentTime = (startTime, availability) => {
  // Convert the requested time into minutes.
  const requestedStartMinutes = timeToMinutes(startTime);

  // Convert the availability boundaries into minutes.
  const availabilityStartMinutes = timeToMinutes(
    dateToTimeString(availability.startTime),
  );

  const availabilityEndMinutes = timeToMinutes(
    dateToTimeString(availability.endTime),
  );

  // Calculate the appointment end time using the configured slot duration.
  const requestedEndMinutes = requestedStartMinutes + availability.slotDuration;

  // Ensure that the appointment starts inside the professional's schedule.
  if (requestedStartMinutes < availabilityStartMinutes) {
    const error = new Error(
      "Selected time is outside professional availability",
    );
    error.statusCode = 400;
    throw error;
  }

  // Ensure that the appointment finishes before the professional's schedule ends.
  if (requestedEndMinutes > availabilityEndMinutes) {
    const error = new Error(
      "Selected time is outside professional availability",
    );
    error.statusCode = 400;
    throw error;
  }

  // Calculate the distance between the availability start and requested slot.
  const minutesFromAvailabilityStart =
    requestedStartMinutes - availabilityStartMinutes;

  // Ensure that the requested time matches the configured slot interval.
  if (minutesFromAvailabilityStart % availability.slotDuration !== 0) {
    const error = new Error("Invalid time");
    error.statusCode = 400;
    throw error;
  }

  // Return the calculated appointment start and end times.
  return {
    startAppointment: minutesToDate(requestedStartMinutes),
    endAppointment: minutesToDate(requestedEndMinutes),
  };
};

// Checks whether a professional already has an appointment in the requested slot.
const checkAppointmentConflict = async ({
  professionalId,
  appointmentDate,
  startAppointment,
  excludeAppointmentId = null,
}) => {
  // Search for an existing appointment in the requested slot.
  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      professionalProfileId: professionalId,
      appointmentDate,
      startAppointment,

      // Exclude the current appointment when rescheduling.
      ...(excludeAppointmentId && {
        id: {
          not: excludeAppointmentId,
        },
      }),
    },
  });

  // Return the conflicting appointment if one exists.
  return existingAppointment;
};

// ============================================================
// CREATE APPOINTMENT
// ============================================================

// Creates a new appointment for the authenticated patient.
export const createAppointment = async (
  userId,
  { professional_id, specialty_id, appointment_date, start_time, reason },
) => {
  // ============================================================
  // VALIDATE REQUIRED FIELDS
  // ============================================================

  // Verify that all required appointment fields were provided.
  if (!professional_id || !specialty_id || !appointment_date || !start_time) {
    const error = new Error("Missing required fields");
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // FIND PATIENT PROFILE
  // ============================================================

  // Find the patient profile belonging to the authenticated user.
  const patientProfile = await prisma.patientProfile.findUnique({
    where: {
      patientId: userId,
    },
  });

  // Stop the process if the user does not have a patient profile.
  if (!patientProfile) {
    const error = new Error("Patient profile not found");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // FIND PROFESSIONAL
  // ============================================================

  // Find the professional selected by the patient.
  const professionalProfile = await prisma.professionalProfile.findUnique({
    where: {
      id: Number(professional_id),
    },
  });

  // Stop the process if the professional does not exist.
  if (!professionalProfile) {
    const error = new Error("Professional not found");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // FIND SPECIALTY
  // ============================================================

  // Find the specialty selected for the appointment.
  const speciality = await prisma.speciality.findUnique({
    where: {
      id: Number(specialty_id),
    },
  });

  // Stop the process if the specialty does not exist.
  if (!speciality) {
    const error = new Error("Specialty not found");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // VALIDATE PROFESSIONAL SPECIALTY
  // ============================================================

  // Verify that the professional provides the selected specialty.
  const professionalSpeciality = await prisma.professionalSpeciality.findUnique(
    {
      where: {
        professionalId_specialityId: {
          professionalId: Number(professional_id),
          specialityId: Number(specialty_id),
        },
      },
    },
  );

  // Stop the process if the professional does not provide this specialty.
  if (!professionalSpeciality) {
    const error = new Error(
      "Professional does not belong to the selected specialty",
    );
    error.statusCode = 409;
    throw error;
  }

  // ============================================================
  // VALIDATE DATE
  // ============================================================

  // Convert the requested appointment date into a Prisma-compatible Date.
  const appointmentDate = parseAppointmentDate(appointment_date);

  // ============================================================
  // FIND AVAILABILITY
  // ============================================================

  // Find the professional's availability for the requested weekday.
  const availability = await getProfessionalAvailability(
    Number(professional_id),
    appointmentDate,
  );

  // Stop the process if the professional does not work on this day.
  if (!availability) {
    const error = new Error("No availability configured for this day");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // VALIDATE TIME
  // ============================================================

  // Validate that the requested time is a valid appointment slot.
  const { startAppointment, endAppointment } = validateAppointmentTime(
    start_time,
    availability,
  );

  // ============================================================
  // CHECK CONFLICT
  // ============================================================

  // Verify that another appointment does not occupy the requested slot.
  const existingAppointment = await checkAppointmentConflict({
    professionalId: Number(professional_id),
    appointmentDate,
    startAppointment,
  });

  // Stop the process if the requested slot is already booked.
  if (existingAppointment) {
    const error = new Error("Selected slot is no longer available");
    error.statusCode = 409;
    throw error;
  }

  // ============================================================
  // CREATE APPOINTMENT
  // ============================================================

  // Create the appointment after all business rules have been validated.
  const appointment = await prisma.appointment.create({
    data: {
      patientProfileId: patientProfile.id,
      professionalProfileId: Number(professional_id),
      specialityId: Number(specialty_id),
      appointmentDate,
      startAppointment,
      endAppointment,
      status: "SCHEDULED",
      reason,
    },
  });

  // Return the created appointment to the controller.
  return appointment;
};

// ============================================================
// GET MY APPOINTMENTS
// ============================================================

// Returns appointments associated with the authenticated user.
export const getMyAppointments = async (userId, role) => {
  // ============================================================
  // PATIENT APPOINTMENTS
  // ============================================================

  if (role === "PATIENT") {
    // Find the patient profile belonging to the authenticated user.
    const patientProfile = await prisma.patientProfile.findUnique({
      where: {
        patientId: userId,
      },
    });

    // Stop the process if the patient profile does not exist.
    if (!patientProfile) {
      const error = new Error("Patient profile not found");
      error.statusCode = 404;
      throw error;
    }

    // Return appointments belonging to this patient.
    return prisma.appointment.findMany({
      where: {
        patientProfileId: patientProfile.id,
      },
      include: {
        patientProfile: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        professionalProfile: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        speciality: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        appointmentDate: "asc",
      },
    });
  }

  // ============================================================
  // PROFESSIONAL APPOINTMENTS
  // ============================================================

  if (role === "PROFESSIONAL") {
    // Find the professional profile belonging to the authenticated user.
    const professionalProfile = await prisma.professionalProfile.findUnique({
      where: {
        professionalId: userId,
      },
    });

    // Stop the process if the professional profile does not exist.
    if (!professionalProfile) {
      const error = new Error("Professional profile not found");
      error.statusCode = 404;
      throw error;
    }

    // Return appointments belonging to this professional.
    return prisma.appointment.findMany({
      where: {
        professionalProfileId: professionalProfile.id,
      },
      include: {
        patientProfile: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        professionalProfile: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        speciality: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        appointmentDate: "asc",
      },
    });
  }

  // ============================================================
  // INVALID ROLE
  // ============================================================

  // Reject roles that are not allowed to access this endpoint.
  const error = new Error("User role not allowed");
  error.statusCode = 403;
  throw error;
};

// ============================================================
// GET APPOINTMENT BY ID
// ============================================================

// Returns one appointment after validating that the user can access it.
export const getAppointmentById = async (appointmentId, userId, role) => {
  // ============================================================
  // VALIDATE APPOINTMENT ID
  // ============================================================

  // Convert the route parameter into a number.
  const id = Number(appointmentId);

  // Ensure that the appointment id is a valid positive integer.
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid appointment id");
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // FIND APPOINTMENT
  // ============================================================

  // Retrieve the appointment together with its related profiles and specialty.
  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
    include: {
      patientProfile: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      professionalProfile: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      speciality: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  // Stop the process if the appointment does not exist.
  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // VALIDATE ACCESS
  // ============================================================

  // Admin users can access any appointment.
  if (role === "ADMIN") {
    return appointment;
  }

  // Check whether the authenticated user is the patient associated with the appointment.
  const isPatient =
    role === "PATIENT" && appointment.patientProfile.patientId === userId;

  // Check whether the authenticated user is the professional associated with the appointment.
  const isProfessional =
    role === "PROFESSIONAL" &&
    appointment.professionalProfile.professionalId === userId;

  // Reject users who are not associated with the appointment.
  if (!isPatient && !isProfessional) {
    const error = new Error(
      "User does not have permission to view this appointment",
    );
    error.statusCode = 403;
    throw error;
  }

  // Return the appointment to the controller.
  return appointment;
};

// ============================================================
// RESCHEDULE APPOINTMENT
// ============================================================

// Changes the date and time of an existing appointment.
export const rescheduleAppointment = async (
  appointmentId,
  userId,
  role,
  { appointment_date, start_time },
) => {
  // ============================================================
  // VALIDATE APPOINTMENT ID
  // ============================================================

  // Convert the route parameter into a number.
  const id = Number(appointmentId);

  // Validate the appointment id.
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid appointment id");
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // FIND APPOINTMENT
  // ============================================================

  // Find the appointment that will be rescheduled.
  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
  });

  // Stop the process if the appointment does not exist.
  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // VALIDATE PERMISSION
  // ============================================================

  // Admin users can reschedule any appointment.
  const isAdmin = role === "ADMIN";

  // Find the patient profile when the authenticated user is a patient.
  const patientProfile =
    role === "PATIENT"
      ? await prisma.patientProfile.findUnique({
          where: {
            patientId: userId,
          },
          select: {
            id: true,
          },
        })
      : null;

  // Check whether the authenticated patient owns the appointment.
  const isOwner =
    role === "PATIENT" &&
    patientProfile &&
    appointment.patientProfileId === patientProfile.id;

  // Reject users without permission.
  if (!isAdmin && !isOwner) {
    const error = new Error(
      "Patient can only reschedule their own appointment",
    );
    error.statusCode = 403;
    throw error;
  }

  // ============================================================
  // VALIDATE STATUS
  // ============================================================

  // Only scheduled or confirmed appointments can be rescheduled.
  if (
    appointment.status !== "SCHEDULED" &&
    appointment.status !== "CONFIRMED"
  ) {
    const error = new Error(
      "Appointment cannot be rescheduled in its current status",
    );
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // VALIDATE DATE
  // ============================================================

  // Convert the new appointment date into a Prisma-compatible Date.
  const appointmentDate = parseAppointmentDate(appointment_date);

  // ============================================================
  // FIND AVAILABILITY
  // ============================================================

  // Find the professional's availability for the new date.
  const availability = await getProfessionalAvailability(
    appointment.professionalProfileId,
    appointmentDate,
  );

  // Stop the process if the professional does not work that day.
  if (!availability) {
    const error = new Error("No availability configured for this day");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // VALIDATE NEW TIME
  // ============================================================

  // Validate the requested new appointment slot.
  const { startAppointment, endAppointment } = validateAppointmentTime(
    start_time,
    availability,
  );

  // ============================================================
  // CHECK NEW SLOT CONFLICT
  // ============================================================

  // Verify that another appointment does not occupy the new slot.
  const existingAppointment = await checkAppointmentConflict({
    professionalId: appointment.professionalProfileId,
    appointmentDate,
    startAppointment,
    excludeAppointmentId: id,
  });

  // Stop the process if the new slot is already booked.
  if (existingAppointment) {
    const error = new Error("Selected slot is already booked");
    error.statusCode = 409;
    throw error;
  }

  // ============================================================
  // UPDATE APPOINTMENT
  // ============================================================

  // Update the appointment with the new date and time.
  const updatedAppointment = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      appointmentDate,
      startAppointment,
      endAppointment,
    },
  });

  // Return the updated appointment to the controller.
  return updatedAppointment;
};

// ============================================================
// CANCEL APPOINTMENT
// ============================================================

// Cancels an existing appointment and stores the cancellation reason.
export const cancelAppointment = async (
  appointmentId,
  userId,
  role,
  cancellation_reason,
) => {
  // ============================================================
  // VALIDATE APPOINTMENT ID
  // ============================================================

  // Convert the route parameter into a number.
  const id = Number(appointmentId);

  // Validate the appointment id.
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid appointment id");
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // FIND APPOINTMENT
  // ============================================================

  // Find the appointment that will be cancelled.
  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
  });

  // Stop the process if the appointment does not exist.
  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // VALIDATE PERMISSION
  // ============================================================

  // Admin users can cancel any appointment.
  if (role !== "ADMIN") {
    // Find the patient profile when the authenticated user is a patient.
    const patientProfile =
      role === "PATIENT"
        ? await prisma.patientProfile.findUnique({
            where: {
              patientId: userId,
            },
            select: {
              id: true,
            },
          })
        : null;

    // Find the professional profile when the authenticated user is a professional.
    const professionalProfile =
      role === "PROFESSIONAL"
        ? await prisma.professionalProfile.findUnique({
            where: {
              professionalId: userId,
            },
            select: {
              id: true,
            },
          })
        : null;

    // Check whether the user is the patient associated with the appointment.
    const isPatient =
      patientProfile && appointment.patientProfileId === patientProfile.id;

    // Check whether the user is the professional associated with the appointment.
    const isProfessional =
      professionalProfile &&
      appointment.professionalProfileId === professionalProfile.id;

    // Reject users who are not related to the appointment.
    if (!isPatient && !isProfessional) {
      const error = new Error(
        "User does not have permission to cancel this appointment",
      );
      error.statusCode = 403;
      throw error;
    }
  }

  // ============================================================
  // VALIDATE STATUS
  // ============================================================

  // Prevent cancellation of appointments that are already cancelled or completed.
  if (
    appointment.status === "CANCELLED" ||
    appointment.status === "COMPLETED" ||
    appointment.status === "NO_SHOW"
  ) {
    const error = new Error(
      "Appointment cannot be cancelled in its current status",
    );
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // CANCEL APPOINTMENT
  // ============================================================

  // Mark the appointment as cancelled and store the cancellation reason.
  const updatedAppointment = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status: "CANCELLED",
      cancellationReason: cancellation_reason,
    },
  });

  // Return the cancelled appointment to the controller.
  return updatedAppointment;
};

// ============================================================
// UPDATE APPOINTMENT STATUS
// ============================================================

// Updates the status of an appointment according to valid transitions.
export const updateAppointmentStatus = async (
  appointmentId,
  userId,
  role,
  status,
) => {
  // ============================================================
  // VALIDATE APPOINTMENT ID
  // ============================================================

  // Convert the route parameter into a number.
  const id = Number(appointmentId);

  // Validate the appointment id.
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid appointment id");
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // VALIDATE STATUS VALUE
  // ============================================================

  // Define the statuses supported by the appointment workflow.
  const allowedStatuses = ["SCHEDULED", "CONFIRMED", "COMPLETED", "NO_SHOW"];

  // Reject unsupported status values.
  if (!allowedStatuses.includes(status)) {
    const error = new Error("Invalid appointment status");
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // FIND APPOINTMENT
  // ============================================================

  // Find the appointment that will have its status changed.
  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
  });

  // Stop the process if the appointment does not exist.
  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  // ============================================================
  // VALIDATE PERMISSION
  // ============================================================

  // Admin users can update any appointment.
  if (role !== "ADMIN") {
    // Find the professional profile belonging to the authenticated user.
    const professionalProfile = await prisma.professionalProfile.findUnique({
      where: {
        professionalId: userId,
      },
      select: {
        id: true,
      },
    });

    // Professionals can only modify their own appointments.
    if (
      role !== "PROFESSIONAL" ||
      !professionalProfile ||
      appointment.professionalProfileId !== professionalProfile.id
    ) {
      const error = new Error(
        "User does not have permission to modify this appointment",
      );
      error.statusCode = 403;
      throw error;
    }
  }

  // ============================================================
  // VALIDATE STATUS TRANSITION
  // ============================================================

  // Define valid transitions supported by the current appointment workflow.
  const validTransitions = {
    SCHEDULED: ["CONFIRMED", "COMPLETED", "NO_SHOW"],

    CONFIRMED: ["COMPLETED", "NO_SHOW"],

    COMPLETED: [],

    NO_SHOW: [],

    CANCELLED: [],
  };

  // Verify that the requested transition is allowed.
  if (!validTransitions[appointment.status].includes(status)) {
    const error = new Error("Invalid status transition");
    error.statusCode = 400;
    throw error;
  }

  // ============================================================
  // UPDATE STATUS
  // ============================================================

  // Persist the new appointment status.
  const updatedAppointment = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  // Return the updated appointment to the controller.
  return updatedAppointment;
};
