import axios from "axios";

// ============================================================
// AVAILABILITY API CONFIGURATION
// ============================================================

// Defines the base URL used for availability-related API requests.
const API_URL = `${import.meta.env.VITE_API_URL}/api`;


// ============================================================
// GET PROFESSIONAL AVAILABILITY
// ============================================================


// Retrieves the recurring availability schedule for a professional.
export const getProfessionalAvailabilityRequest = async (professionalId) => {

  try {

    const response = await axios.get(
      `${API_URL}/professionals/${professionalId}/availability`
    );

    return response.data;

  } catch (error) {

    console.error("Failed to load professional availability:", error);

    throw error;

  }

};


// ============================================================
// GET AVAILABLE SLOTS
// ============================================================

// Retrieves the available appointment slots for a professional
// on a specific date.
export const getAvailableSlotsRequest = async (professionalId, date) => {

  try {

    const response = await axios.get(
      `${API_URL}/professionals/${professionalId}/available-slots`,
      {
        params: { date }
      }
    );

    return response.data;

  } catch (error) {

    console.error("Failed to load available slots:", error);

    throw error;

  }

};


// ============================================================
// CREATE PROFESSIONAL AVAILABILITY
// ============================================================

// Creates a recurring availability schedule for a professional.
export const createProfessionalAvailabilityRequest = async (
  professionalId,
  availabilityData,
  token
) => {

  try {

    const response = await axios.post(
      `${API_URL}/professionals/${professionalId}/availability`,
      availabilityData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Failed to create professional availability:",
      error
    );

    throw error;

  }

};