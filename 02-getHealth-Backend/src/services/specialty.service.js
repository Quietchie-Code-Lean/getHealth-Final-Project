import prisma from "../config/prisma.js";

// ============================================================
// GET ALL SPECIALTIES
// ============================================================

// Retrieves all specialties from the database.
export const getSpecialties = async () => {
  const specialties = await prisma.speciality.findMany();

  return specialties;
};

// ============================================================
// GET SPECIALTY BY ID
// ============================================================

// Retrieves a single specialty by its unique ID.
export const getSpecialtyById = async (id) => {
  const specialty = await prisma.speciality.findUnique({
    where: {
      id,
    },
  });

  return specialty;
};

// ============================================================
// CREATE SPECIALTY
// ============================================================

// Creates a new specialty after checking that its name is not already in use.
export const createSpecialty = async (name, description) => {
  // Check whether a specialty with the same name already exists.
  const existing = await prisma.speciality.findUnique({
    where: {
      name,
    },
  });

  // Prevent duplicate specialty names.
  if (existing) {
    const error = new Error("Specialty already exists");
    error.status = 409;
    throw error;
  }

  // Create the new specialty.
  const specialty = await prisma.speciality.create({
    data: {
      name,
      description,
    },
  });

  return specialty;
};

// ============================================================
// UPDATE SPECIALTY
// ============================================================

// Updates an existing specialty after validating its existence and name uniqueness.
export const updateSpecialty = async (id, name, description, isActive) => {
  // Find the specialty that will be updated.
  const existingSpecialty = await prisma.speciality.findUnique({
    where: {
      id,
    },
  });

  // Prevent updates when the specialty does not exist.
  if (!existingSpecialty) {
    const error = new Error("Specialty not found");
    error.status = 404;
    throw error;
  }

  // Check whether another specialty already uses the requested name.
  const existingByName = await prisma.speciality.findUnique({
    where: {
      name,
    },
  });

  // Prevent duplicate names while allowing the current specialty to keep its name.
  if (existingByName && existingByName.id !== id) {
    const error = new Error("Specialty name already exists");
    error.status = 409;
    throw error;
  }

  // Update the specialty with the validated data.
  const specialty = await prisma.speciality.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      isActive,
    },
  });

  return specialty;
};

// ============================================================
// UPDATE SPECIALTY STATUS
// ============================================================

// Updates the active status of an existing specialty.
export const updateSpecialtyStatus = async (id, isActive) => {
  // Find the specialty whose status will be updated.
  const existingSpecialty = await prisma.speciality.findUnique({
    where: {
      id,
    },
  });

  // Prevent status updates when the specialty does not exist.
  if (!existingSpecialty) {
    const error = new Error("Specialty not found");
    error.status = 404;
    throw error;
  }

  // Update only the active status.
  const specialty = await prisma.speciality.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  });

  return specialty;
};
