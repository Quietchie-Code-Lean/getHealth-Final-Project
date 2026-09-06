import { beforeEach, describe, expect, it, vi } from "vitest";

// ============================================================
// MOCK PRISMA
// ============================================================

// Mock Prisma so service tests do not connect to the real database.
// Each Prisma method is replaced with a Vitest mock function.
const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    speciality: {
      findUnique: vi.fn(),
    },
  },
}));

// Replace the real Prisma module with the mocked Prisma instance.
vi.mock("../../config/prisma.js", () => ({
  default: prismaMock,
}));

// ============================================================
// IMPORTS
// ============================================================

// Import the mocked Prisma instance so we can verify its calls.
import prisma from "../../config/prisma.js";

// Import the service function being tested.
import {
  findUserByEmail,
  findUserById,
  registerPatient,
  registerProfessional,
} from "../../services/auth.service.js";

// ============================================================
// TEST SETUP
// ============================================================

// Clear all mock calls and results before each test.
// This prevents one test from affecting another.
beforeEach(() => {
  vi.clearAllMocks();
});

// ============================================================
// FIND USER BY EMAIL
// ============================================================

describe("findUserByEmail", () => {
  it("should find a user by email", async () => {
    // ============================================================
    // ARRANGE
    // ============================================================

    // Define the email that will be used to search for the user.
    const email = "patient@test.com";

    // Define the fake user that Prisma should return.
    const mockUser = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email,
      role: "PATIENT",
    };

    // Configure the Prisma mock to resolve with the fake user.
    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    // ============================================================
    // ACT
    // ============================================================

    // Execute the service function using the test email.
    const result = await findUserByEmail(email);

    // ============================================================
    // ASSERT
    // ============================================================

    // Verify that Prisma was called with the expected query.
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });

    // Verify that the service returns the user received from Prisma.
    expect(result).toEqual(mockUser);
  });
});

it("should return null when the user does not exist", async () => {
  // ============================================================
  // ARRANGE
  // ============================================================

  // Define an email that does not belong to any user.
  const email = "notfound@test.com";

  // Configure the Prisma mock to simulate a user that does not exist.
  prismaMock.user.findUnique.mockResolvedValue(null);

  // ============================================================
  // ACT
  // ============================================================

  // Execute the service function using the non-existent email.
  const result = await findUserByEmail(email);

  // ============================================================
  // ASSERT
  // ============================================================

  // Verify that Prisma was called with the expected email.
  expect(prisma.user.findUnique).toHaveBeenCalledWith({
    where: { email },
  });

  // Verify that the service returns null when no user is found.
  expect(result).toBeNull();
});

// ============================================================
// FIND USER BY ID
// ============================================================

describe("findUserById", () => {
  it("should find a user by ID", async () => {
    // ============================================================
    // ARRANGE
    // ============================================================

    // Define the user ID that will be used to search for the user.
    const id = 1;

    // Define the fake user returned by Prisma.
    const mockUser = {
      id,
      firstName: "John",
      lastName: "Doe",
      email: "patient@test.com",
      role: "PATIENT",
      patientProfile: {
        phone: "+56912345678",
      },
      professionalProfile: null,
    };

    // Configure the Prisma mock to return the fake user.
    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    // ============================================================
    // ACT
    // ============================================================

    // Execute the service function using the test ID.
    const result = await findUserById(id);

    // ============================================================
    // ASSERT
    // ============================================================

    // Verify that Prisma was called with the expected ID and relations.
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id },
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

    // Verify that the service returns the user received from Prisma.
    expect(result).toEqual(mockUser);
  });

  it("should return null when the user does not exist", async () => {
    // ============================================================
    // ARRANGE
    // ============================================================

    // Define an ID that does not belong to any user.
    const id = 999;

    // Configure the Prisma mock to simulate a user that does not exist.
    prismaMock.user.findUnique.mockResolvedValue(null);

    // ============================================================
    // ACT
    // ============================================================

    // Execute the service function using the non-existent ID.
    const result = await findUserById(id);

    // ============================================================
    // ASSERT
    // ============================================================

    // Verify that Prisma was called with the expected ID and relations.
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id },
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

    // Verify that the service returns null when no user is found.
    expect(result).toBeNull();
  });
});

// ============================================================
// REGISTER PATIENT
// ============================================================

describe("registerPatient", () => {
  it("should create a patient successfully", async () => {
    // ============================================================
    // ARRANGE
    // ============================================================

    // Define the patient data used to create the new user.
    const patientData = {
      firstName: "John",
      lastName: "Doe",
      email: "patient@test.com",
      hashedPassword: "hashed-password",
      phone: "+56912345678",
      dateOfBirth: new Date("1990-01-15"),
      identificationNumber: "12345678-9",
    };

    // Define the fake patient returned by Prisma after creation.
    const mockPatient = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "patient@test.com",
      role: "PATIENT",
      patientProfile: {
        phone: "+56912345678",
        dateOfBirth: new Date("1990-01-15"),
        identificationNumber: "12345678-9",
      },
    };

    // Configure Prisma to return the fake patient.
    prismaMock.user.create.mockResolvedValue(mockPatient);

    // ============================================================
    // ACT
    // ============================================================

    // Execute the service function with the patient data.
    const result = await registerPatient(patientData);

    // ============================================================
    // ASSERT
    // ============================================================

    // Verify that Prisma receives the expected patient data.
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "patient@test.com",
        passwordHash: "hashed-password",
        role: "PATIENT",
        patientProfile: {
          create: {
            phone: "+56912345678",
            dateOfBirth: new Date("1990-01-15"),
            identificationNumber: "12345678-9",
          },
        },
      },
      include: {
        patientProfile: true,
      },
    });

    // Verify that the service returns the patient created by Prisma.
    expect(result).toEqual(mockPatient);
  });
});

it("should convert empty optional fields to undefined", async () => {
  // ============================================================
  // ARRANGE
  // ============================================================

  // Define patient data with empty optional fields.
  const patientData = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@test.com",
    hashedPassword: "hashed-password",
    phone: "   ",
    dateOfBirth: new Date("1995-05-20"),
    identificationNumber: "",
  };

  // Define the fake patient returned by Prisma.
  const mockPatient = {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@test.com",
    role: "PATIENT",
    patientProfile: {
      phone: undefined,
      dateOfBirth: new Date("1995-05-20"),
      identificationNumber: undefined,
    },
  };

  // Configure Prisma to return the fake patient.
  prismaMock.user.create.mockResolvedValue(mockPatient);

  // ============================================================
  // ACT
  // ============================================================

  // Execute the service function with empty optional fields.
  const result = await registerPatient(patientData);

  // ============================================================
  // ASSERT
  // ============================================================

  // Verify that empty optional fields are converted to undefined.
  expect(prisma.user.create).toHaveBeenCalledWith({
    data: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@test.com",
      passwordHash: "hashed-password",
      role: "PATIENT",
      patientProfile: {
        create: {
          phone: undefined,
          dateOfBirth: new Date("1995-05-20"),
          identificationNumber: undefined,
        },
      },
    },
    include: {
      patientProfile: true,
    },
  });

  // Verify that the service returns the patient created by Prisma.
  expect(result).toEqual(mockPatient);
});

// ============================================================
// REGISTER PROFESSIONAL
// ============================================================

describe("registerProfessional", () => {
  it("should create a professional successfully", async () => {
    // ============================================================
    // ARRANGE
    // ============================================================

    // Define the professional data used to create the new user.
    const professionalData = {
      firstName: "Dr. Jane",
      lastName: "Smith",
      email: "doctor@test.com",
      hashedPassword: "hashed-password",
      licenseNumber: "LIC-12345",
      specialityId: 1,
      dateOfBirth: new Date("1985-03-10"),
      identificationNumber: "98765432-1",
    };

    // Define the specialty found by Prisma.
    const mockSpeciality = {
      id: 1,
      name: "Cardiology",
    };

    // Define the professional returned by Prisma after creation.
    const mockProfessional = {
      id: 2,
      firstName: "Dr. Jane",
      lastName: "Smith",
      email: "doctor@test.com",
      role: "PROFESSIONAL",
      professionalProfile: {
        licenseNumber: "LIC-12345",
        approvalStatus: "PENDING",
        dateOfBirth: new Date("1985-03-10"),
        identificationNumber: "98765432-1",
        professionalSpecialties: [
          {
            speciality: mockSpeciality,
          },
        ],
      },
    };

    // Configure Prisma to confirm that the specialty exists.
    prismaMock.speciality.findUnique.mockResolvedValue(mockSpeciality);

    // Configure Prisma to return the created professional.
    prismaMock.user.create.mockResolvedValue(mockProfessional);

    // ============================================================
    // ACT
    // ============================================================

    // Execute the service function with the professional data.
    const result = await registerProfessional(professionalData);

    // ============================================================
    // ASSERT
    // ============================================================

    // Verify that Prisma checks the requested specialty.
    expect(prisma.speciality.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    // Verify that Prisma receives the expected professional data.
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        firstName: "Dr. Jane",
        lastName: "Smith",
        email: "doctor@test.com",
        passwordHash: "hashed-password",
        role: "PROFESSIONAL",
        professionalProfile: {
          create: {
            licenseNumber: "LIC-12345",
            approvalStatus: "PENDING",
            dateOfBirth: new Date("1985-03-10"),
            identificationNumber: "98765432-1",
            professionalSpecialties: {
              create: {
                specialityId: 1,
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

    // Verify that the service returns the professional created by Prisma.
    expect(result).toEqual(mockProfessional);
  });
});

it("should throw a 404 error when the specialty does not exist", async () => {
  // ============================================================
  // ARRANGE
  // ============================================================

  // Define professional data with a non-existent specialty ID.
  const professionalData = {
    firstName: "John",
    lastName: "Smith",
    email: "doctor@test.com",
    hashedPassword: "hashed-password",
    licenseNumber: "LIC-99999",
    specialityId: 999,
    dateOfBirth: new Date("1980-06-15"),
    identificationNumber: "11111111-1",
  };

  // Configure Prisma to simulate a specialty that does not exist.
  prismaMock.speciality.findUnique.mockResolvedValue(null);

  // ============================================================
  // ACT & ASSERT
  // ============================================================

  // Verify that the service throws the expected error.
  await expect(registerProfessional(professionalData)).rejects.toMatchObject({
    message: "Specialty not found",
    statusCode: 404,
  });

  // ============================================================
  // ASSERT
  // ============================================================

  // Verify that Prisma searched for the correct specialty ID.
  expect(prisma.speciality.findUnique).toHaveBeenCalledWith({
    where: { id: 999 },
  });

  // Verify that the professional was not created.
  expect(prisma.user.create).not.toHaveBeenCalled();
});
