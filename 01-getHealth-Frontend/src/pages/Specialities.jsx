import { useEffect, useState } from "react";
import { getSpecialities } from "../services/Speciality.services.js";
import SpecialitiesCarousel from "../components/SpecialitiesCarousel.jsx";

const Specialities = () => {
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

  return (
    <section className="mx-auto max-w-6xl px-2 py-10">
      <h1 className="mb-8 text-3xl font-bold">Specialities</h1>

      <div className="pt-20">
        <SpecialitiesCarousel specialities={specialities} />
      </div>
    </section>
  );
};

export default Specialities;
