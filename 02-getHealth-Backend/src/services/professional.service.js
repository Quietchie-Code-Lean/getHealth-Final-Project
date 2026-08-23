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


export const findProfessionalByIdService = async (professionalId) => {

    return await prisma.professionalProfile.findUnique({

        where: {
            id: professionalId,
        },

        select: {
            id: true,
            professionalId: true,
            licenseNumber: true,
            approvalStatus: true,
            dateOfBirth: true,
            identificationNumber: true,
        },

    });
};

export const updateProfessionalService = async (professionalId, updateData) => {

    return await prisma.professionalProfile.update({

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
};


export const updateProfessionalStatusService = async (professionalId, approvalStatus) => {

  return await prisma.professionalProfile.update({

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
};


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


export const findProfessionalSpecialityService = async (professionalId, specialityId) => {

  const professionalSpeciality = await prisma.professionalSpeciality.findFirst({

      where: {
        professionalId,
        specialityId,
      },

    });

  return professionalSpeciality;
};



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


export const removeProfessionalSpecialityService = async (professionalSpecialityId) => {

  const deletedProfessionalSpeciality = await prisma.professionalSpeciality.delete({

      where: {
        id: professionalSpecialityId,
      },

    });

  return deletedProfessionalSpeciality;
};