import axios from "axios";

// ============================================================
// AUTH API CONFIGURATION
// ============================================================

// Defines the base URL used for authentication-related API requests.
const API_URL = "http://localhost:3000/api/auth";

// ============================================================
// LOGIN REQUEST
// ============================================================

// Sends the user's credentials to the authentication endpoin and returns the API response.
export const loginRequest = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);

  return response.data;
};

// ============================================================
// PATIENT REGISTRATION REQUEST
// ============================================================

// Sends the patient registration data to the correspondin authentication endpoint and returns the API response.
export const registerPatientRequest = async (patientData) => {
  const response = await axios.post(`${API_URL}/register/patient`, patientData);

  return response.data;
};

// ============================================================
// PROFESSIONAL REGISTRATION REQUEST
// ============================================================

// Sends the professional registration data to the correspondin authentication endpoint and returns the API response.
export const registerProfessionalRequest = async (professionalData) => {
  const response = await axios.post(
    `${API_URL}/register/professional`,
    professionalData,
  );

  return response.data;
};

// ============================================================
// PROFILE REQUEST
// ============================================================

// Retrieves the authenticated user's profile using the provided bearer token for authorization.
export const getProfileRequest = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
