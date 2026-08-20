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
                    phone,
                    dateOfBirth,
                    identificationNumber,
                },
            },
        },

        include: {
            patientProfile: true,
        },
    });

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