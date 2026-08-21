import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/specialties`;

// ============================================================
// GET SPECIALTIES
// ============================================================

// Fetches the specialties from the backend API.
export const getSpecialities = async () => {
  try {
    // Send a GET request to the specialties endpoint.
    const response = await axios.get(API_URL);

    // Return only the specialties data needed by the frontend.
    return response.data.specialties;
  } catch (error) {
    // Convert API or network errors into a frontend-friendly error.
    throw new Error("Failed to fetch specialties");
  }
};
