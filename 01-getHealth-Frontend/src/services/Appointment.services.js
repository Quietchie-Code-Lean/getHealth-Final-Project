import authAxios from "./axios.js";

// ============================================================
// APPOINTMENT API CONFIGURATION
// ============================================================

// Defines the base URL used for appointment-related API requests.
const API_URL = "/appointments";

// ============================================================
// GET MY APPOINTMENTS
// ============================================================

// Retrieves the appointments associated with the authenticated user.
export const getMyAppointmentsRequest = async () => {
  const response = await authAxios.get(`${API_URL}/me`);

  return response.data;
};

// ============================================================
// CREATE APPOINTMENT
// ============================================================

// Sends the appointment data to the backend and returns the API response.
export const createAppointmentRequest = async (appointmentData) => {
  const response = await authAxios.post(API_URL, appointmentData);

  return response.data;
};
