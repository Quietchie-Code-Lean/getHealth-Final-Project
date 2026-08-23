import {
    getProfessionalAvailability,
    createProfessionalAvailability,
    updateAvailability,
    deleteAvailability,
    getProfessionalAvailableSlots,
} from "../services/availability.services.js";


export const getProfessionalAvailabilityController = async (req, res, next) => {
    
    try {

        const professionalId = Number(req.params.id);

        const availability = await getProfessionalAvailability(professionalId);

        return res.status(200).json({
            availability,
        });

    } catch (error) {

        next(error);

    }
};


export const createProfessionalAvailabilityController = async (req, res, next) => {

    try {

        const professionalId = Number(req.params.id);
        const availabilityData = req.body;

        const availability = await createProfessionalAvailability(
            professionalId,
            availabilityData
        );

        return res.status(201).json({
            message: "Availability created successfully",
            availability,
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