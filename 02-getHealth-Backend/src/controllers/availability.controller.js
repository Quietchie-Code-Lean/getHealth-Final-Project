import {
    getProfessionalAvailability,
    getProfessionalProfileByUserId,
    findProfessionalAvailabilityOverlap,
    createProfessionalAvailability,
    updateAvailability,
    deleteAvailability,
    getProfessionalAvailableSlots,
} from "../services/availability.services.js";

import {
  timeToMinutes,
  timeStringToDate,
  dateToTimeString,
} from "../helpers/date.helpers.js";




export const getProfessionalAvailabilityController = async (req, res, next) => {

    try {

        const professionalId = Number(req.params.id);

        if (!Number.isInteger(professionalId) || professionalId <= 0) {

            const error = new Error("Invalid professional id");
            error.statusCode = 400;

            throw error;

        }

        const professionalProfile = await getProfessionalAvailability(professionalId);

        if (!professionalProfile) {

            const error = new Error("Professional not found");
            error.statusCode = 404;

            throw error;

        }

        const availability = professionalProfile.availability.map((availabilityItem) => {

            return {
                id: availabilityItem.id,
                weekday: availabilityItem.weekday,
                start_time: dateToTimeString(availabilityItem.startTime),
                end_time: dateToTimeString(availabilityItem.endTime),
                slot_duration: availabilityItem.slotDuration,
                is_active: availabilityItem.availableSlot,
            };

        });

        return res.status(200).json({
            professional_id: professionalId,
            availability: availability,
        });


    } catch (error) {

        next(error);

    }
};






const allowedWeekdays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];


export const createProfessionalAvailabilityController = async (req, res, next) => {

  try {

    const authenticatedUser = req.user;

    const professionalId = Number(req.params.id);

    const {weekday, start_time, end_time, slot_duration } = req.body;


    // Validate professional ID
    if (!Number.isInteger(professionalId) || professionalId <= 0) {

      const error = new Error("Invalid professional id");
      error.statusCode = 400;

      throw error;
    }


    // Validate allowed role
    if (
      authenticatedUser.role !== "PROFESSIONAL" &&
      authenticatedUser.role !== "ADMIN") {

      const error = new Error("Forbidden");
      error.statusCode = 403;

      throw error;
    }


    // Professionals can only manage their own availability
    if (
      authenticatedUser.role === "PROFESSIONAL" &&
      authenticatedUser.id !== professionalId
    ) {

      const error = new Error( "Professional can only manage their own availability");

      error.statusCode = 403;

      throw error;
    }


    // Validate weekday
    if (!allowedWeekdays.includes(weekday)) {

      const error = new Error("Invalid weekday");
      error.statusCode = 400;

      throw error;
    }


    // Convert times to minutes.
    // timeToMinutes() also validates HH:mm format.
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);


    // Validate time range
    if (startMinutes >= endMinutes) {

      const error = new Error("Invalid time range");
      error.statusCode = 400;

      throw error;
    }


    // Validate slot duration
    if (!Number.isInteger(slot_duration) || slot_duration <= 0) {

      const error = new Error("Invalid slot duration");
      error.statusCode = 400;

      throw error;
    }


    // Convert API time strings into Date objects for Prisma
    const startTime = timeStringToDate(start_time);
    const endTime = timeStringToDate(end_time);


    // Find the professional profile
    const professionalProfile = await getProfessionalProfileByUserId(professionalId);

    if (!professionalProfile) {

      const error = new Error("Professional not found");
      error.statusCode = 404;

      throw error;
    }


    // Check if the new schedule overlaps another one
    const overlappingAvailability =
     await findProfessionalAvailabilityOverlap(
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


    // Prepare Prisma data
    const availabilityData = {
      weekday: weekday,
      startTime: startTime,
      endTime: endTime,
      slotDuration: slot_duration,
    };


    // Create availability
    const newAvailability =
      await createProfessionalAvailability(
        professionalProfile.id,
        availabilityData
      );


    // API Contract response
    return res.status(201).json({
      message: "Availability created successfully",

      availability: {
        id: newAvailability.id,
        professional_id: professionalId,
        weekday: newAvailability.weekday,
        start_time: dateToTimeString(newAvailability.startTime),
        end_time: dateToTimeString(newAvailability.endTime),
        slot_duration: newAvailability.slotDuration,
        is_active: newAvailability.availableSlot,
      },
    });


  } catch (error) {

    next(error);
  }
};


export const updateAvailabilityController = async (req, res, next) => {

    try {

        const availabilityId = Number(req.params.id);
        const availabilityData = req.body;

        const availability = await updateAvailability(
            availabilityId,
            availabilityData
        );

        return res.status(200).json({
            message: "Availability updated successfully",
            availability,
        });

    } catch (error) {

        next(error);

    }
};


export const deleteAvailabilityController = async (req, res, next) => {

    try {

        const availabilityId = Number(req.params.id);

        await deleteAvailability(availabilityId);

        return res.status(200).json({
            message: "Availability deleted successfully",
        });

    } catch (error) {

        next(error);

    }
};


export const getProfessionalAvailableSlotsController = async (req, res, next) => {

    try {

        const professionalId = Number(req.params.id);
        const requestedDate = req.query.date;

        const availableSlots = await getProfessionalAvailableSlots(
            professionalId,
            requestedDate
        );

        return res.status(200).json({
            availableSlots,
        });

    } catch (error) {

        next(error);

    }
};