import prisma from "../config/prisma.js";

// ============================================================
// GET PROFESSIONAL AVAILABILITY
// ============================================================

// Retrieves a professional profile together with its availability schedules.
export const getProfessionalAvailability = async (professionalId) => {

  const professionalProfile = await prisma.professionalProfile.findUnique({

      where: {
        professionalId: professionalId,
      },

      select: {
        id: true,
        professionalId: true,

        availabilities: {

          select: {
            id: true,
            weekday: true,
            startTime: true,
            endTime: true,
            slotDuration: true,
            availableSlot: true,
          },

          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

  return professionalProfile;
};

// ============================================================
// GET PROFESSIONAL PROFILE
// ============================================================

// Retrieves a professional profile using the associated user ID.
export const getProfessionalProfileByUserId = async (professionalId) => {

  const professionalProfile = await prisma.professionalProfile.findUnique({

      where: {
        professionalId: professionalId,
      },

      select: {
        id: true,
        professionalId: true,
      },
    });

  return professionalProfile;
};

// ============================================================
// FIND OVERLAPPING AVAILABILITY
// ============================================================

// Finds an active availability schedule that overlaps the requested time range.
export const findProfessionalAvailabilityOverlap = async (
  professionalProfileId,
  weekday,
  startTime,
  endTime
) => {

  const overlappingAvailability = await prisma.availability.findFirst({

      where: {
        professionalProfileId: professionalProfileId,
        weekday: weekday,
        availableSlot: true,

        startTime: {
          lt: endTime,
        },

        endTime: {
          gt: startTime,
        },
      },
    });

  return overlappingAvailability;
};

// ============================================================
// CREATE PROFESSIONAL AVAILABILITY
// ============================================================

// Creates a new availability schedule for a professional profile.
export const createProfessionalAvailability = async (
  professionalProfileId,
  availabilityData
) => {

  const newAvailability =
    await prisma.availability.create({

      data: {
        professionalProfileId: professionalProfileId,
        weekday: availabilityData.weekday,
        startTime: availabilityData.startTime,
        endTime: availabilityData.endTime,
        slotDuration: availabilityData.slotDuration,
      },
    });

  return newAvailability;
};




// ============================================================
// GET AVAILABILITY BY ID
// ============================================================

// Retrieves an availability together with its professional profile.
export const getAvailabilityById = async (availabilityId) => {

  const availability = await prisma.availability.findUnique({

    where: {
      id: availabilityId,
    },

    select: {
      id: true,
      professionalProfileId: true,
      weekday: true,
      startTime: true,
      endTime: true,
      slotDuration: true,
      availableSlot: true,

      professionalProfile: {
        select: {
          id: true,
          professionalId: true,
        },
      },
    },
  });

  return availability;
};

// ============================================================
// FIND UPDATE AVAILABILITY OVERLAP
// ============================================================

// Finds another active availability that overlaps the updated time range.
export const findUpdatedAvailabilityOverlap = async (
  availabilityId,
  professionalProfileId,
  weekday,
  startTime,
  endTime
) => {

  const overlappingAvailability =
    await prisma.availability.findFirst({

      where: {
        professionalProfileId: professionalProfileId,
        weekday: weekday,
        availableSlot: true,

        id: {
          not: availabilityId,
        },

        startTime: {
          lt: endTime,
        },

        endTime: {
          gt: startTime,
        },
      },
    });

  return overlappingAvailability;
};

// ============================================================
// UPDATE AVAILABILITY
// ============================================================

// Updates an existing professional availability schedule.
export const updateAvailability = async (availabilityId, availabilityData) => {

  const updatedAvailability = await prisma.availability.update({

      where: {
        id: availabilityId,
      },

      data: {
        weekday: availabilityData.weekday,
        startTime: availabilityData.startTime,
        endTime: availabilityData.endTime,
        slotDuration: availabilityData.slotDuration,
        availableSlot: availabilityData.availableSlot,
      },
    });

  return updatedAvailability;
};


// ============================================================
// FIND FUTURE APPOINTMENT FOR AVAILABILITY
// ============================================================

// Finds a future appointment that depends on the availability schedule.
export const findFutureAppointmentForAvailability = async (
  professionalProfileId,
  weekday,
  startTime,
  endTime
) => {

  const currentDate = new Date();

  const futureAppointments =
    await prisma.appointment.findMany({

      where: {
        professionalProfileId: professionalProfileId,

        appointmentDate: {
          gte: currentDate,
        },

        status: {
          in: [
            "SCHEDULED",
            "CONFIRMED",
          ],
        },
      },

      select: {
        id: true,
        appointmentDate: true,
        startAppointment: true,
        endAppointment: true,
      },
    });

  const dependentAppointment =
    futureAppointments.find((appointment) => {

      const appointmentWeekday =
        getWeekday(appointment.appointmentDate);

      const sameWeekday =
        appointmentWeekday === weekday;

      const insideAvailability =
        appointment.startAppointment >= startTime &&
        appointment.endAppointment <= endTime;

      return sameWeekday && insideAvailability;
    });

  return dependentAppointment;
};



// ============================================================
// GET FUTURE PROFESSIONAL APPOINTMENTS
// ============================================================

// Retrieves future active appointments for a professional profile.
export const getFutureProfessionalAppointments = async (
  professionalProfileId
) => {

  const currentDate = new Date();

  const futureAppointments =
    await prisma.appointment.findMany({

      where: {
        professionalProfileId: professionalProfileId,

        appointmentDate: {
          gte: currentDate,
        },

        status: {
          in: [
            "SCHEDULED",
            "CONFIRMED",
          ],
        },
      },

      select: {
        id: true,
        appointmentDate: true,
        startAppointment: true,
        endAppointment: true,
      },
    });

  return futureAppointments;
};




// ============================================================
// DELETE AVAILABILITY
// ============================================================

// Deletes an availability schedule by its ID.
export const deleteAvailability = async (availabilityId) => {

  const deletedAvailability =
    await prisma.availability.delete({

      where: {
        id: availabilityId,
      },
    });

  return deletedAvailability;
};






/* 


export const getProfessionalAvailableSlots = async (professionalId, requestedDate) => {

  // Slot generation logic will be implemented in Endpoint 5

}; 



*/