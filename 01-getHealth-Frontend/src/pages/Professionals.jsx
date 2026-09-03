import { useEffect, useState } from "react";

import { getProfessionalsRequest } from "../services/Professional.services.js";

import ProfessionalsCarousel from "../components/ProfessionalsCarousel.jsx";

// ============================================================

// PROFESSIONALS PAGE COMPONENT

// ============================================================

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);

  // Stores the loading state while professionals are being fetched.
  const [loading, setLoading] = useState(true);

  // Stores the error state in case the API request fails.
  const [error, setError] = useState(false);

  // ============================================================

  // LOAD PROFESSIONALS

  // ============================================================

  // Retrieves the registered healthcare professionals from the API.
  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        // Requests the professionals from the backend service.
        const data = await getProfessionalsRequest();

        setProfessionals(data.professionals);
      } catch (error) {
        // Handles errors generated while requesting the professionals.
        console.error("Error loading professionals:", error);
        setError(true);
      } finally {
        // Ends the loading state after the request is completed.
        setLoading(false);
      }
    };

    loadProfessionals();
  }, []);

  // ============================================================

  // PROFESSIONALS PAGE RENDER

  // ============================================================

  return (
    <section className="mx-auto max-w-6xl px-2 py-10">
      <h1 className="mb-8 text-3xl font-bold">Professionals</h1>

      <div className="pt-20">
        {/* Displays a loading message while professionals are being fetched. */}
        {loading && <p>Loading professionals...</p>}

        {/* Displays an error message when the professionals request fails. */}
        {!loading && error && (
          <p>Unable to load professionals. Please try again later.</p>
        )}

        {/* Displays an empty state when the API returns no professionals. */}
        {!loading && !error && professionals.length === 0 && (
          <p>No professionals available.</p>
        )}

        {/* Displays the professionals carousel when data is available. */}
        {!loading && !error && professionals.length > 0 && (
          <ProfessionalsCarousel professionals={professionals} />
        )}
      </div>
    </section>
  );
};

export default Professionals;
