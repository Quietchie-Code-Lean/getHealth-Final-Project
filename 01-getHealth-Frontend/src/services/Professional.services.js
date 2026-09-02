import axios from "axios";

// ============================================================
// PROFESSIONAL API CONFIGURATION
// ============================================================

// Defines the base URL used for professional-related API requests.
const API_URL = `${import.meta.env.VITE_API_URL}/api/professionals`;

// ============================================================
// GET PROFESSIONALS
// ============================================================

// Retrieves professionals, optionally filtered by specialty.
export const getProfessionalsRequest = async (specialtyId = null) => {
  try {
    const response = await axios.get(API_URL, {
      params: specialtyId
        ? {
            specialty_id: specialtyId,
          }
        : {},
    });

    return response.data;
  } catch (error) {
    // Logs the original error for development and propagates it to the caller.
    console.error("Failed to load professionals:", error);

    throw error;
  }
};

// ============================================================
// GET PROFESSIONAL BY ID
// ============================================================
// Retrieves the complete public profile of a professional.
export const getProfessionalByIdRequest = async (professionalId) => {
  const response = await axios.get(`${API_URL}/${professionalId}`);

  return response.data;
};
