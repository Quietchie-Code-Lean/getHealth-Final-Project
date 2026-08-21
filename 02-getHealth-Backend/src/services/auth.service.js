import prisma from "../config/prisma.js";


// Find user by email
export const findUserByEmail = async (email) => {

    return await prisma.user.findUnique({
        where: {
            email,
        },
    });

};


// Find user by id
export const findUserById = async (id) => {

    return await prisma.user.findUnique({
        where: {
            id,
        },

        include: {
            patientProfile: true,
            professionalProfile: true,
        },
    });

};


// Register patient
export const registerProfessional = async ({
    firstName,
    lastName,
    email,
    hashedPassword,
    licenseNumber,
    specialityId,
    dateOfBirth,
    identificationNumber,
    
}) => {

    return await prisma.user.create({

        data: {
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword,
            role: "PROFESSIONAL",

            professionalProfile: {
                create: {
                    licenseNumber,
                    approvalStatus: "PENDING",
                    dateOfBirth,
                    identificationNumber,

                    professionalSpecialties: {
                        create: {
                            specialityId
                        }
                    }
                },
            },
        },

        include: {
            professionalProfile: {
                include: {
                    professionalSpecialties: {
                        include: {
                            speciality: true
                        }
                    }
                }
            },
        },
    }
);

};


// Register professional
export const registerProfessional = async ({
    firstName,
    lastName,
    email,
    hashedPassword,
    licenseNumber,
    dateOfBirth,
    identificationNumber,

}) => {

    return await prisma.user.create({

        data: {
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword,
            role: "PROFESSIONAL",

            professionalProfile: {
                create: {
                    licenseNumber,
                    approvalStatus: "PENDING",
                    dateOfBirth,
                    identificationNumber,
                },
            },
        },

        include: {
            professionalProfile: true,
        },
    });
};