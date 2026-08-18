import prisma from "../config/prisma.js";

// Retrieves all specialties from the database.
export const getSpecialties = async () => {
  const specialties = await prisma.speciality.findMany();

  return specialties;
};

// Retrieves a single specialty from the database by its unique ID.
export const getSpecialtyById = async (id) => {
  const specialty = await prisma.speciality.findUnique({
    where: {
      id,
    },
  });

  return specialty;
};

// Creates a new specialty after checking that its name is not already in use.
export const createSpecialty = async (name, description) => {
  const existing = await prisma.speciality.findUnique({
    where: {
      name,
    },
  });

  if (existing) {
    const error = new Error("Specialty already exists");
    error.status = 409;
    throw error;
  }

  const specialty = await prisma.speciality.create({
    data: {
      name,
      description,
    },
  });

  return specialty;
};

// Updates an existing specialty after validating its existence and name uniqueness.
export const updateSpecialty = async (id, name, description, isActive) => {
  const existingSpecialty = await prisma.speciality.findUnique({
    where: {
      id,
    },
  });

  if (!existingSpecialty) {
    const error = new Error("Specialty not found");
    error.status = 404;
    throw error;
  }

  const existingByName = await prisma.speciality.findUnique({
    where: {
      name,
    },
  });

  if (existingByName && existingByName.id !== id) {
    const error = new Error("Specialty name already exists");
    error.status = 409;
    throw error;
  }

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

// Updates the active status of an existing specialty.
export const updateSpecialtyStatus = async (id, isActive) => {
  const existingSpecialty = await prisma.speciality.findUnique({
    where: {
      id,
    },
  });

  if (!existingSpecialty) {
    const error = new Error("Specialty not found");
    error.status = 404;
    throw error;
  }

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
