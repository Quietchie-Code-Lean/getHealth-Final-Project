import { useEffect, useState } from "react";

import { getSpecialities } from "../services/Speciality.services.js";

import SpecialitiesCarousel from "../components/SpecialitiesCarousel.jsx";

const Specialities = () => {
  // Stores the specialties retrieved from the backend API.
  const [specialities, setSpecialities] = useState([]);

  // Stores the loading state while specialties are being fetched.
  const [loading, setLoading] = useState(true);

  // Stores the error state in case the API request fails.
  const [error, setError] = useState(false);

  // Loads the specialties when the page is mounted.
  useEffect(() => {
    const loadSpecialities = async () => {
      try {
        // Requests the specialties from the backend service.
        const data = await getSpecialities();

        setSpecialities(data);
      } catch (error) {
        // Handles errors generated while requesting the specialties.
        console.error("Error loading specialities:", error);
        setError(true);
      } finally {
        // Ends the loading state after the request is completed.
        setLoading(false);
      }
    };

    loadSpecialities();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-2 py-10">
      <h1 className="mb-8 text-3xl font-bold">Specialities</h1>

      <div className="pt-20">
        {/* Displays a loading message while specialties are being fetched. */}
        {loading && <p>Loading specialties...</p>}

        {/* Displays an error message when the specialties request fails. */}
        {!loading && error && (
          <p>Failed to load specialties. Please try again later.</p>
        )}

        {/* Displays an empty state when the API returns no specialties. */}
        {!loading && !error && specialities.length === 0 && (
          <p>No specialties available.</p>
        )}

        {/* Displays the specialties carousel when data is available. */}
        {!loading && !error && specialities.length > 0 && (
          <SpecialitiesCarousel specialities={specialities} />
        )}
      </div>
    </section>
  );
};

export default Specialities;
