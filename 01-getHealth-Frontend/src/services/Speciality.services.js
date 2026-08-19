const API_URL = "http://localhost:3000/api/specialties";

// Fetches the specialties from the backend API and returns the specialties list.
export const getSpecialities = async () => {
  const response = await fetch(API_URL);

  // Converts unsuccessful HTTP responses into an error handled by the components.
  if (!response.ok) {
    throw new Error("Failed to fetch specialties");
  }

  // Parses the API response body as JSON.
  const data = await response.json();

  // Returns only the specialties data needed by the frontend.
  return data.specialties;
};
