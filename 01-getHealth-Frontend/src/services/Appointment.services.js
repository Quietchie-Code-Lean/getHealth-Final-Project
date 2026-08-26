import axios from "axios";

// ============================================================
// APPOINTMENT API CONFIGURATION
// ============================================================

// Defines the base URL used for appointment-related API requests.
const API_URL = `${import.meta.env.VITE_API_URL}/api/appointments`;
// ============================================================
// GET MY APPOINTMENTS
// ============================================================

// Retrieves the appointments associated with the authenticated user.
export const getMyAppointmentsRequest = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ============================================================
// CREATE APPOINTMENT
// ============================================================

// Sends the appointment data to the backend and returns the API response.
export const createAppointmentRequest = async (token, appointmentData) => {
  const response = await axios.post(API_URL, appointmentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
