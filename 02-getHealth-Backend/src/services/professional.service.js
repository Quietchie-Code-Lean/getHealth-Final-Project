import prisma from "../config/prisma.js";


export const getProfessionalsService = async ({ specialityId, isActive }) => {

    const professionals = await prisma.user.findMany({

        where: {
            role: "PROFESSIONAL", // Only users whose role is PROFESSIONAL

            // isActive is optional.
            // Only add this Prisma filter when the query parameter was actually provided.
            ...(isActive !== undefined && { isActive }),

            // specialityId is optional.
            // "some" means: at least one related speciality must match.
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


        // Explicitly select only the information needed by this public endpoint.
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

