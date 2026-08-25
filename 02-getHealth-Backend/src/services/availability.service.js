import prisma from "../config/prisma.js";


export const getProfessionalAvailability = async (professionalId) => {

  const professionalProfile = await prisma.professionalProfile.findFirst({

      where: {
        professionalId: professionalId,
      },
      
      select: {
        id: true,
        professionalId: true,
        availability: {
          select: {
            id: true,
            weekday: true,
            startTime: true,
            endTime: true,
            slotDuration: true,
            availableSlot: true,
          },
        },
      },
    });

  return professionalProfile;
};


export const createProfessionalAvailability = async (professionalId, availabilityData) => {

  // Prisma logic will be implemented in Endpoint 2

};


export const updateAvailability = async (availabilityId, availabilityData) => {

  // Prisma logic will be implemented in Endpoint 3

};


export const deleteAvailability = async (availabilityId) => {

  // Prisma logic will be implemented in Endpoint 4

};


export const getProfessionalAvailableSlots = async (professionalId, requestedDate) => {

  // Slot generation logic will be implemented in Endpoint 5

};