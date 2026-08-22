import prisma from "../config/prisma.js";
import { emptyToUndefined } from "../utils/helpers.js";


export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};


export const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },

        include: {
            patientProfile: true,
            professionalProfile: {
                include: {
                    professionalSpecialties: {
                        include: {
                            speciality: true,
                        },
                    },
                },
            },
        },
    });
};


export const registerPatient = async ({
    firstName,
    lastName,
    email,
    hashedPassword,
    phone,
    dateOfBirth,
    identificationNumber,
}) => {
    return await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword,
            role: "PATIENT",

            patientProfile: {
                create: {
                    phone: emptyToUndefined(phone),
                    dateOfBirth,
                    identificationNumber: emptyToUndefined(identificationNumber),
                },
            },
        },

        include: {
            patientProfile: true,
        },
    });
};


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
    const speciality = await prisma.speciality.findUnique({
        where: {
            id: specialityId,
        },
    });

    if (!speciality) {
        const error = new Error("Specialty not found");
        error.statusCode = 404;
        throw error;
    }

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
                    identificationNumber: emptyToUndefined(identificationNumber),

                    professionalSpecialties: {
                        create: {
                            specialityId,
                        },
                    },
                },
            },
        },

        include: {
            professionalProfile: {
                include: {
                    professionalSpecialties: {
                        include: {
                            speciality: true,
                        },
                    },
                },
            },
        },
    });
};
