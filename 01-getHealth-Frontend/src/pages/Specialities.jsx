import { useEffect, useState } from "react";
import { getSpecialities } from "../services/Speciality.services.js";
import SpecialitiesCarousel from "../components/SpecialitiesCarousel.jsx";

const Specialities = () => {
  // Stores the specialties retrieved from the backend API.
  const [specialities, setSpecialities] = useState([]);

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
      }
    };

    loadSpecialities();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-2 py-10">
      <h1 className="mb-8 text-3xl font-bold">Specialities</h1>

      {/* Displays the specialties using the reusable carousel component. */}
      <div className="pt-20">
        <SpecialitiesCarousel specialities={specialities} />
      </div>
    </section>
  );
};

export default Specialities;
