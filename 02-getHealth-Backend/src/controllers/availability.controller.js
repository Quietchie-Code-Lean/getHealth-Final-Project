import {
    getProfessionalAvailability,
    getProfessionalProfileByUserId,
    findProfessionalAvailabilityOverlap,
    createProfessionalAvailability,
    getAvailabilityById,
    updateAvailability,
    getFutureProfessionalAppointments,
    deleteAvailability,
    getProfessionalAvailabilityByWeekday,
    getProfessionalAppointmentsByDate,
} from "../services/availability.services.js";

import {
    timeToMinutes,
    minutesToDate,
    parseAppointmentDate,
    getWeekday,
} from "../utils/dateTime.utils.js";


import {
    formatAvailabilityResponse,
    formatCreatedAvailabilityResponse,
    formatUpdatedAvailabilityResponse,
    generateAvailabilitySlots,
    isAvailabilitySlotOccupied,
    formatAvailableSlotResponse,
} from "../utils/availability.utils.js";


// ============================================================
// GET PROFESSIONAL AVAILABILITY
// ============================================================

export const getProfessionalAvailabilityController = async (req, res, next) => {

    try {

        const professionalId = Number(req.params.id);

        // Validate professional ID.
        if (!Number.isInteger(professionalId) || professionalId <= 0) {

            const error = new Error("Invalid professional id");
            error.statusCode = 400;

            throw error;
        }

        // Find the professional profile and its availability.
        const professionalProfile = await getProfessionalAvailability(professionalId);

        if (!professionalProfile) {

            const error = new Error("Professional not found");
            error.statusCode = 404;

            throw error;
        }

        // Format availability according to the API Contract.
        const availability = professionalProfile.availabilities.map(formatAvailabilityResponse);

        return res.status(200).json({
            professional_id: professionalId,
            availability: availability,
        });

    } catch (error) {

        next(error);
    }
};

// ============================================================
// CREATE PROFESSIONAL AVAILABILITY
// ============================================================

export const createProfessionalAvailabilityController = async (req, res, next) => {

    try {

        const authenticatedUser = req.user;

        const professionalId = Number(req.params.id);

        const {
            weekday,
            start_time,
            end_time,
            slot_duration,
        } = req.body;

        // Validate professional ID.
        if (!Number.isInteger(professionalId) || professionalId <= 0) {

            const error = new Error("Invalid professional id");
            error.statusCode = 400;

            throw error;
        }

        // Professionals can only manage their own availability.
        if (authenticatedUser.role === "PROFESSIONAL" && authenticatedUser.id !== professionalId) {

            const error = new Error("Professional can only manage their own availability");

            error.statusCode = 403;

            throw error;
        }

        // Find the professional profile.
        const professionalProfile = await getProfessionalProfileByUserId(professionalId);

        if (!professionalProfile) {

            const error = new Error("Professional not found");
            error.statusCode = 404;

            throw error;
        }

        // Convert API time strings into minutes.
        const startMinutes = timeToMinutes(start_time);
        const endMinutes = timeToMinutes(end_time);

        // Convert minutes into Date objects compatible with Prisma @db.Time.
        const startTime = minutesToDate(startMinutes);
        const endTime = minutesToDate(endMinutes);

        // Check whether the requested schedule overlaps an existing one.
        const overlappingAvailability = await findProfessionalAvailabilityOverlap(
            professionalProfile.id,
            weekday,
            startTime,
            endTime
        );

        if (overlappingAvailability) {

            const error = new Error("Availability overlaps with an existing schedule");

            error.statusCode = 409;

            throw error;
        }

        // Prepare availability data for Prisma.
        const availabilityData = {
            weekday: weekday,
            startTime: startTime,
            endTime: endTime,
            slotDuration: slot_duration,
        };

        // Create the availability schedule.
        const newAvailability =
            await createProfessionalAvailability(
                professionalProfile.id,
                availabilityData
            );

        // Format availability according to the API Contract.
        const formattedAvailability =
            formatCreatedAvailabilityResponse(
                newAvailability,
                professionalId
            );

        // Return the API Contract response.
        return res.status(201).json({
            message: "Availability created successfully",
            availability: formattedAvailability,
        });


    } catch (error) {

        next(error);
    }
};



// ============================================================
// UPDATE AVAILABILITY
// ============================================================

export const updateAvailabilityController = async (req, res, next) => {

  try {

    const authenticatedUser = req.user;

    const availabilityId = Number(req.params.id);

    const {
      weekday,
      start_time,
      end_time,
      slot_duration,
      is_active,
    } = req.body;

    // Validate availability ID.
    if (!Number.isInteger(availabilityId) || availabilityId <= 0) {

      const error = new Error("Invalid availability id");
      error.statusCode = 400;

      throw error;
    }

    // Find the availability and its professional owner.
    const existingAvailability = await getAvailabilityById(availabilityId);

    if (!existingAvailability) {

      const error = new Error("Availability not found");
      error.statusCode = 404;

      throw error;
    }

    const professionalId =
      existingAvailability.professionalProfile.professionalId;

    // Professionals can only manage their own availability.
    if (authenticatedUser.role === "PROFESSIONAL" && authenticatedUser.id !== professionalId) {

      const error = new Error("Professional can only manage their own availability");

      error.statusCode = 403;

      throw error;
    }

    // Convert API time strings into minutes.
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);

    // Convert minutes into Date objects compatible with Prisma @db.Time.
    const startTime = minutesToDate(startMinutes);
    const endTime = minutesToDate(endMinutes);

    // Check whether the updated schedule overlaps another availability.
    const overlappingAvailability =
      await findUpdatedAvailabilityOverlap(
        availabilityId,
        existingAvailability.professionalProfileId,
        weekday,
        startTime,
        endTime
      );

    if (overlappingAvailability) {

      const error = new Error(
        "Updated schedule overlaps with another availability"
      );

      error.statusCode = 409;

      throw error;
    }

    // Prepare availability data for Prisma.
    const availabilityData = {
      weekday: weekday,
      startTime: startTime,
      endTime: endTime,
      slotDuration: slot_duration,
      availableSlot: is_active,
    };

    // Update the availability schedule.
    const updatedAvailability =
      await updateAvailability(
        availabilityId,
        availabilityData
      );

    // Format availability according to the API Contract.
    const formattedAvailability =
      formatUpdatedAvailabilityResponse(
        updatedAvailability,
        professionalId
      );

    // Return the API Contract response.
    return res.status(200).json({
      message: "Availability updated successfully",
      availability: formattedAvailability,
    });

  } catch (error) {

    next(error);
  }
};




// ============================================================
// DELETE AVAILABILITY
// ============================================================

export const deleteAvailabilityController = async (req, res, next) => {

  try {

    const authenticatedUser = req.user;

    const availabilityId = Number(req.params.id);

    // Validate availability ID.
    if (!Number.isInteger(availabilityId) || availabilityId <= 0) {

      const error = new Error("Invalid availability id");
      error.statusCode = 400;

      throw error;
    }

    // Find the availability and its professional owner.
    const existingAvailability =
      await getAvailabilityById(availabilityId);

    if (!existingAvailability) {

      const error = new Error("Availability not found");
      error.statusCode = 404;

      throw error;
    }

    const professionalId = existingAvailability.professionalProfile.professionalId;

    // Professionals can only delete their own availability.
    if (authenticatedUser.role === "PROFESSIONAL" && authenticatedUser.id !== professionalId) {

      const error = new Error("Professional can only delete their own availability");

      error.statusCode = 403;

      throw error;
    }

    // Find future appointments for the professional.
    const futureAppointments = await getFutureProfessionalAppointments(
        existingAvailability.professionalProfileId
      );

    // Check whether a future appointment depends on this schedule.
    const dependentAppointment = futureAppointments.find((appointment) => {

        const appointmentWeekday = getWeekday(appointment.appointmentDate);

        const sameWeekday = appointmentWeekday === existingAvailability.weekday;

        const insideAvailability =
          appointment.startAppointment >= existingAvailability.startTime &&
          appointment.endAppointment <= existingAvailability.endTime;

        return sameWeekday && insideAvailability;
        
      });

    if (dependentAppointment) {

      const error = new Error("Availability cannot be deleted because future appointments depend on it");

      error.statusCode = 409;

      throw error;
    }

    // Delete the availability schedule.
    await deleteAvailability(availabilityId);

    return res.status(200).json({
      message: "Availability deleted successfully",
    });

  } catch (error) {

    next(error);
  }
};


// ============================================================
// GET PROFESSIONAL AVAILABLE SLOTS
// ============================================================

export const getProfessionalAvailableSlotsController = async (req, res, next) => {

  try {

    const professionalId = Number(req.params.id);

    const requestedDateString = req.query.date;

    // Validate professional ID.
    if (!Number.isInteger(professionalId) || professionalId <= 0) {

      const error = new Error("Invalid professional id");

      error.statusCode = 400;

      throw error;
    }

    // Convert requested date into a Prisma-compatible Date.
    const requestedDate = parseAppointmentDate(requestedDateString);

    // Determine the weekday represented by the requested date.
    const requestedWeekday = getWeekday(requestedDate);

    // Find active professional availability for the requested weekday.
    const professionalProfile = await getProfessionalAvailabilityByWeekday(
        professionalId,
        requestedWeekday
      );

    if (!professionalProfile) {

      const error = new Error("Professional not found");

      error.statusCode = 404;

      throw error;
    }

    if (professionalProfile.availabilities.length === 0) {

      const error = new Error("No availability configured for this day");

      error.statusCode = 404;

      throw error;
    }

    // Find appointments already booked for the requested date.
    const appointments = await getProfessionalAppointmentsByDate(
        professionalProfile.id,
        requestedDate
      );

    const availableSlots = [];

    // Generate slots from every availability schedule configured for the day.
    for (const availability of professionalProfile.availabilities) {

      const generatedSlots = generateAvailabilitySlots(availability);

      for (const slot of generatedSlots) {

        const occupied = isAvailabilitySlotOccupied(slot, appointments);

        if (!occupied) {

          const formattedSlot = formatAvailableSlotResponse(slot);

          availableSlots.push(formattedSlot);
          
        }
      }
    }

    return res.status(200).json({
      professional_id: professionalId,
      date: requestedDateString,
      available_slots: availableSlots,
    });

  } catch (error) {

    next(error);
  }
};