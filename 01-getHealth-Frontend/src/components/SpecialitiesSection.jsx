import { useEffect, useState } from "react";
import { getSpecialities } from "../services/Speciality.services.js";
import CardGen from "./CardGen.jsx";
import { Link } from "react-router-dom";

const SpecialitiesSection = () => {
  const [specialities, setSpecialities] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSpecialities = async () => {
      try {
        const data = await getSpecialities();
        setSpecialities(data);
      } catch (error) {
        console.error("Error loading specialities:", error);
        setError(true);
      }
    };

    loadSpecialities();
  }, []);

  const btnSpecClass =
    "inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700";

  return (
    <section>
      <h2>Our Specialities</h2>

      <p>Find the care you need</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {error ? (
          <p>Unable to load specialties. Please try again later.</p>
        ) : (
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

      <Link to="/specialities" className={btnSpecClass}>
        View all Specialities
      </Link>
    </section>
  );
};

export default SpecialitiesSection;
