import prisma from "../config/prisma.js";


// ============================================================
// GET ALL PROFESSIONALS
// ============================================================

// Retrieves all professional users with optional speciality
// and active-status filters.
export const getProfessionalsService = async ({specialityId, isActive}) => {

    const professionals = await prisma.user.findMany({

        where: {
            role: "PROFESSIONAL",

            // Apply the active-status filter only when provided.
            ...(isActive !== undefined && {isActive}),

            // Apply the speciality filter only when provided.
            ...(specialityId !== undefined && {
                professionalProfile: {
                    is: {
                        professionalSpecialties: {
                            some: {
                                specialityId,
                            },
                        },
                    },
                },
            }),
        },

        // Select only information required by this public endpoint.
        select: {
            id: true,
            firstName: true,
            lastName: true,

            professionalProfile: {
                select: {
                    id: true,
                    licenseNumber: true,
                    approvalStatus: true,

                    professionalSpecialties: {
                        select: {
                            speciality: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    return professionals;
};


// ============================================================
// GET PROFESSIONAL BY ID
// ============================================================

// Retrieves one professional by ProfessionalProfile.id.
export const getProfessionalByIdService = async (professionalId) => {

    const professional = await prisma.professionalProfile.findUnique({

        where: {
            id: professionalId,
        },

        select: {
            id: true,
            licenseNumber: true,
            approvalStatus: true,

            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },

            professionalSpecialties: {
                select: {
                    speciality: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return professional;
};


// ============================================================
// FIND PROFESSIONAL PROFILE
// ============================================================

// Retrieves the professional profile information required for
// authorization, validation and update operations.
export const findProfessionalByIdService = async (professionalId) => {

    const professional = await prisma.professionalProfile.findUnique({

        where: {
            id: professionalId,
        },

        select: {
            id: true,

            // User.id that owns this ProfessionalProfile.
            professionalId: true,

            licenseNumber: true,
            approvalStatus: true,
            dateOfBirth: true,
            identificationNumber: true,
        },
    });

    return professional;
};


// ============================================================
// UPDATE PROFESSIONAL PROFILE
// ============================================================

// Updates the requested professional profile.
export const updateProfessionalService = async (professionalId, updateData) => {

    const professional = await prisma.professionalProfile.update({

        where: {
            id: professionalId,
        },

        data: updateData,

        select: {
            id: true,
            professionalId: true,
            licenseNumber: true,
            dateOfBirth: true,
            identificationNumber: true,
            approvalStatus: true,
        },
    });

    return professional;
};


// ============================================================
// UPDATE PROFESSIONAL APPROVAL STATUS
// ============================================================

// Updates only the approval status of a professional profile.
export const updateProfessionalStatusService = async (professionalId, approvalStatus) => {

    const professional = await prisma.professionalProfile.update({

        where: {
            id: professionalId,
        },

        data: {
            approvalStatus,
        },

        select: {
            id: true,
            approvalStatus: true,
        },
    });

    return professional;
};


// ============================================================
// FIND SPECIALITY
// ============================================================

// Retrieves a speciality by its ID.
export const findSpecialityByIdService = async (specialityId) => {

    const speciality = await prisma.speciality.findUnique({

        where: {
            id: specialityId,
        },

        select: {
            id: true,
            name: true,
            isActive: true,
        },
    });

    return speciality;
};


// ============================================================
// FIND PROFESSIONAL SPECIALITY
// ============================================================

// Checks whether a professional-speciality relationship exists.
export const findProfessionalSpecialityService = async (professionalId, specialityId) => {

    const professionalSpeciality = await prisma.professionalSpeciality.findFirst({

            where: {
                professionalId,
                specialityId,
            },
        });

    return professionalSpeciality;
};


// ============================================================
// ADD PROFESSIONAL SPECIALITY
// ============================================================

// Creates a professional-speciality relationship.
export const addProfessionalSpecialityService = async (professionalId, specialityId) => {

    const professionalSpeciality = await prisma.professionalSpeciality.create({

            data: {
                professionalId,
                specialityId,
            },

            select: {
                professionalId: true,
                specialityId: true,
            },
        });

    return professionalSpeciality;
};


// ============================================================
// REMOVE PROFESSIONAL SPECIALITY
// ============================================================

// Deletes a professional-speciality relationship.
export const removeProfessionalSpecialityService = async (professionalSpecialityId) => {

    const deletedProfessionalSpeciality = await prisma.professionalSpeciality.delete({

            where: {
                id: professionalSpecialityId,
            },
        });

    return deletedProfessionalSpeciality;
};