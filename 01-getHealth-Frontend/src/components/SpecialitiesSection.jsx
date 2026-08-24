import { useEffect, useState } from "react";
import { getSpecialities } from "../services/Speciality.services.js";
import CardGen from "./CardGen.jsx";
import { Link } from "react-router-dom";

const SpecialitiesSection = () => {
  // Stores the specialties retrieved from the backend API.
  const [specialities, setSpecialities] = useState([]);

  // Tracks whether an error occurred while loading the specialties.
  const [error, setError] = useState(false);

  // Loads the specialties when the Home section is mounted.
  useEffect(() => {
    const loadSpecialities = async () => {
      try {
        // Gets the real specialties from the backend instead of using static data.
        const data = await getSpecialities();
        setSpecialities(data);
      } catch (error) {
        // Activates the error state if the API request fails.
        console.error("Error loading specialities:", error);
        setError(true);
      }
    };

    loadSpecialities();
  }, []);

  // Reusable Tailwind classes for the link to the full specialties page.
  const btnSpecClass =
    "inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700";

  return (
    <section>
      <h2>Our Specialities</h2>

      <p>Find the care you need</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {error ? (
          // Displays a friendly message when the specialties cannot be loaded.
          <p>Unable to load specialties. Please try again later.</p>
        ) : (
          // Shows only the first three specialties in the Home page section.
          specialities
            .slice(0, 3)
            .map((speciality) => (
              <CardGen
                key={speciality.id}
                title={speciality.name}
                description={speciality.description}
              />
            ))
        )}
      </div>

      {/* Navigates to the page containing all available specialties. */}
      <Link to="/specialities" className={btnSpecClass}>
        View all Specialities
      </Link>
    </section>
  );
};

export default SpecialitiesSection;
