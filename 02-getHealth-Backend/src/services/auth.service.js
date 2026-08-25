import prisma from "../config/prisma.js";
import { emptyToUndefined } from "../utils/helpers.js";

// ============================================================
// FIND USER BY EMAIL
// ============================================================

// Retrieves a user account by email for authentication and account existence validation.
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// ============================================================
// FIND USER BY ID
// ============================================================

// Retrieves a user account by ID together with the profile and specialty information associated with the user's role.
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

// ============================================================
// REGISTER PATIENT
// ============================================================

// Creates a patient user account and its associated patient profile, while converting optional empty values before database insertion.
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

// ============================================================
// REGISTER PROFESSIONAL
// ============================================================

// Creates a professional user account, validates the selected specialty, and associates the specialty with the professional profile.
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
  // ============================================================
  // SPECIALTY VALIDATION
  // ============================================================

  // Verifies that the selected specialty exists before creating the professional account.
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

  // ============================================================
  // PROFESSIONAL ACCOUNT CREATION
  // ============================================================

  // Creates the professional account with its profile and initial specialty relationship.
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
