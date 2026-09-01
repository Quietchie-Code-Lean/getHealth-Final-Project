import { useEffect, useState } from "react";
import { getProfessionalsRequest } from "../services/Professional.services.js";
import ProfessionalsCarousel from "../components/ProfessionalsCarousel.jsx";

// ============================================================
// PROFESSIONALS PAGE COMPONENT
// ============================================================
const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [error, setError] = useState(false);

  // ============================================================
  // LOAD PROFESSIONALS
  // ============================================================
  // Retrieves the registered healthcare professionals from the API.
  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const data = await getProfessionalsRequest();
        setProfessionals(data.professionals);
      } catch (error) {
        console.error("Error loading professionals:", error);
        setError(true);
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
        {error ? (
          <p>Unable to load professionals. Please try again later.</p>
        ) : (
          <ProfessionalsCarousel professionals={professionals} />
        )}
      </div>
    </section>
  );
};

export default Professionals;
