import {
    getProfessionalAvailability,
    getProfessionalProfileByUserId,
    findProfessionalAvailabilityOverlap,
    createProfessionalAvailability,
    //updateAvailability,
    //deleteAvailability,
    //getProfessionalAvailableSlots,
} from "../services/availability.services.js";

import {
    timeToMinutes,
    minutesToDate
} from "../utils/dateTime.utils.js";


import {
    formatAvailabilityResponse,
    formatCreatedAvailabilityResponse,
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






/* 






export const updateAvailabilityController = async (req, res, next) => {

    try {

        const availabilityId = Number(req.params.id);
        const availabilityData = req.body;

        const availability = await updateAvailability(availabilityId, availabilityData);

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





*/