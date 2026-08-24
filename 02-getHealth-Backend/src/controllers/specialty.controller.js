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

// ============================================================
// GET ALL SPECIALTIES
// ============================================================

// Handles the HTTP request to retrieve all specialties.
export const getSpecialtiesController = async (req, res) => {
  try {
    // Retrieve all specialties from the service.
    const specialtiesFromDatabase = await getSpecialties();

    // Convert database records into the API response format.
    const specialties = specialtiesFromDatabase.map(mapSpecialty);

    // Return the specialties list.
    return res.status(200).json({
      specialties,
    });
  } catch (error) {
    console.error(error);

    // Return a generic error for unexpected server failures.
    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// ============================================================
// GET SPECIALTY BY ID
// ============================================================

// Handles the HTTP request to retrieve a specialty by its unique ID.
export const getSpecialtyByIdController = async (req, res) => {
  try {
    // Convert the route parameter into a number.
    const id = Number(req.params.id);

    // Validate that the specialty ID is a positive integer.
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid specialty id",
      });
    }

    // Retrieve the specialty from the service.
    const specialty = await getSpecialtyById(id);

    // Return 404 when the requested specialty does not exist.
    if (!specialty) {
      return res.status(404).json({
        message: "Specialty not found",
      });
    }

    // Convert the database record into the API response format.
    return res.status(200).json({
      specialty: mapSpecialty(specialty),
    });
  } catch (error) {
    console.error(error);

    // Return a generic error for unexpected server failures.
    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// ============================================================
// CREATE SPECIALTY
// ============================================================

// Handles the HTTP request to create a new specialty.
export const createSpecialtyController = async (req, res) => {
  try {
    // Extract specialty data from the request body.
    const { name, description } = req.body;

    // Validate that the specialty name is provided.
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    // Remove unnecessary whitespace from the specialty name.
    const cleanName = name.trim();

    // Delegate specialty creation and business validation to the service.
    const specialty = await createSpecialty(cleanName, description);

    // Return the created specialty using the API response format.
    return res.status(201).json({
      message: "Specialty created successfully",
      specialty: mapCreatedSpecialty(specialty),
    });
  } catch (error) {
    console.error(error);

    // Return a conflict when the specialty name already exists.
    if (error.status === 409) {
      return res.status(409).json({
        message: error.message,
      });
    }

    // Return a generic error for unexpected server failures.
    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// ============================================================
// UPDATE SPECIALTY
// ============================================================

// Handles the HTTP request to update an existing specialty.
export const updateSpecialtyController = async (req, res) => {
  try {
    // Convert the route parameter into a number.
    const id = Number(req.params.id);

    // Validate that the specialty ID is a positive integer.
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid specialty id",
      });
    }

    // Extract update data from the request body.
    const { name, description, is_active } = req.body;

    // Validate the specialty name.
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    // Validate the specialty description.
    if (typeof description !== "string") {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    // Validate the active status.
    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    // Remove unnecessary whitespace from the specialty name.
    const cleanName = name.trim();

    // Delegate specialty update and business validation to the service.
    const specialty = await updateSpecialty(
      id,
      cleanName,
      description,
      is_active,
    );

    // Return the updated specialty using the API response format.
    return res.status(200).json({
      message: "Specialty updated successfully",
      specialty: mapUpdatedSpecialty(specialty),
    });
  } catch (error) {
    console.error(error);

    // Return 404 when the specialty does not exist.
    if (error.status === 404) {
      return res.status(404).json({
        message: error.message,
      });
    }

    // Return 409 when the specialty name is already in use.
    if (error.status === 409) {
      return res.status(409).json({
        message: error.message,
      });
    }

    // Return a generic error for unexpected server failures.
    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};

// ============================================================
// UPDATE SPECIALTY STATUS
// ============================================================

// Handles the HTTP request to update the active status of a specialty.
export const updateSpecialtyStatusController = async (req, res) => {
  try {
    // Convert the route parameter into a number.
    const id = Number(req.params.id);

    // Validate that the specialty ID is a positive integer.
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid specialty id",
      });
    }

    // Extract the requested status from the request body.
    const { is_active } = req.body;

    // Validate that is_active is a Boolean value.
    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        message: "is_active must be a Boolean",
      });
    }

    // Delegate status update to the service.
    const specialty = await updateSpecialtyStatus(id, is_active);

    // Return the updated status using the API response format.
    return res.status(200).json({
      message: "Specialty status updated successfully",
      specialty: mapSpecialtyStatus(specialty),
    });
  } catch (error) {
    console.error(error);

    // Return 404 when the specialty does not exist.
    if (error.status === 404) {
      return res.status(404).json({
        message: error.message,
      });
    }

    // Return a generic error for unexpected server failures.
    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
};
