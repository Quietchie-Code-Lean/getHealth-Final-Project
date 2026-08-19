const API_URL = "http://localhost:3000/api/specialties";

export const getSpecialities = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch specialties");
  }

  const data = await response.json();

  return data.specialties;
};
