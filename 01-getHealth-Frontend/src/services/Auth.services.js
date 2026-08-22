import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";


export const loginRequest = async (credentials) => {

  const response = await axios.post(`${API_URL}/login`, credentials);

  return response.data;
};


export const registerPatientRequest = async (patientData) => {

  const response = await axios.post(`${API_URL}/register/patient`, patientData);

  return response.data;
};


export const registerProfessionalRequest = async (professionalData) => {

  const response = await axios.post(`${API_URL}/register/professional`, professionalData);

  return response.data;
};

export const getProfileRequest = async (token) => {

  const response = await axios.get(`${API_URL}/profile`,
          {
            headers: { 
            Authorization: `Bearer ${token}` 
            }
          }
        );

  return response.data;
  
};