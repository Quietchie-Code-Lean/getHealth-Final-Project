import {
  getSpecialties,
  getSpecialtyById,
  createSpecialty,
  updateSpecialty,
  updateSpecialtyStatus,
} from "../services/specialty.service.js";

import {
  mapSpecialty,
  mapCreatedSpecialty,
  mapUpdatedSpecialty,
  mapSpecialtyStatus,
} from "../utils/specialty.mapper.js";

// Handles the HTTP request to retrieve all specialties.
export const getSpecialtiesController = async (req, res) => {
  try {
    const specialtiesFromDatabase = await getSpecialties();

    const specialties = specialtiesFromDatabase.map(mapSpecialty);

    return res.status(200).json({
      specialties,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// Handles the HTTP request to retrieve a specialty by its unique ID.
export const getSpecialtyByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid specialty id",
      });
    }

    const specialty = await getSpecialtyById(id);

    if (!specialty) {
      return res.status(404).json({
        message: "Specialty not found",
      });
    }

    return res.status(200).json({
      specialty: mapSpecialty(specialty),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// Handles the HTTP request to create a new specialty.
export const createSpecialtyController = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const cleanName = name.trim();

    const specialty = await createSpecialty(cleanName, description);

    return res.status(201).json({
      message: "Specialty created successfully",
      specialty: mapCreatedSpecialty(specialty),
    });
  } catch (error) {
    console.error(error);

    if (error.status === 409) {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// Handles the HTTP request to update an existing specialty.
export const updateSpecialtyController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid specialty id",
      });
    }

    const { name, description, is_active } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    if (typeof description !== "string") {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    const cleanName = name.trim();

    const specialty = await updateSpecialty(
      id,
      cleanName,
      description,
      is_active,
    );

    return res.status(200).json({
      message: "Specialty updated successfully",
      specialty: mapUpdatedSpecialty(specialty),
    });
  } catch (error) {
    console.error(error);

    if (error.status === 404) {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.status === 409) {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// Handles the HTTP request to update the active status of a specialty.
export const updateSpecialtyStatusController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid specialty id",
      });
    }

    const { is_active } = req.body;

    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        message: "is_active must be a Boolean",
      });
    }

    const specialty = await updateSpecialtyStatus(id, is_active);

    return res.status(200).json({
      message: "Specialty status updated successfully",
      specialty: mapSpecialtyStatus(specialty),
    });
  } catch (error) {
    console.error(error);

    if (error.status === 404) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};
