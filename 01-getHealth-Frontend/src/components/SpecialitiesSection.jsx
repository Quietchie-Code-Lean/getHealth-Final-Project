import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardGen from "./CardGen.jsx";
import { getSpecialities } from "../services/Speciality.services.js";

// ============================================================
// SPECIALITIES SECTION COMPONENT
// ============================================================

const SpecialitiesSection = () => {

  const navigate = useNavigate();

  /* Preset Tailwind Styles */

  const sectionClass = "bg-slate-900 py-16 sm:py-20";
  const containerClass = "mx-auto max-w-7xl px-6 sm:px-8 lg:px-12";
  const headerClass = "mb-10";
  const eyebrowClass = "text-sm font-semibold uppercase tracking-wider text-violet-400";
  const titleClass = "mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl";
  const descriptionClass = "mt-3 max-w-2xl text-base leading-7 text-slate-300";
  const cardsContainerClass = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";
  const stateMessageClass = "rounded-xl border border-slate-700 bg-slate-800 px-6 py-8 text-center text-sm text-slate-400";
  const errorMessageClass = "rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-8 text-center text-sm text-red-300";
  const actionsClass = "mt-10 flex justify-center";
  const buttonClass = "rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500";

  // ============================================================
  // SPECIALITIES STATE
  // ============================================================

  const [specialities, setSpecialities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // ============================================================
  // LOAD SPECIALITIES
  // ============================================================

  useEffect(() => {

    const loadSpecialities = async () => {

      try {

        setLoading(true);
        setError(null);

        const data = await getSpecialities();

        setSpecialities(data || []);

      } catch (error) {

        console.error("Failed to load specialities:", error);

        setSpecialities([]);
        setError("Failed to load specialities.");

      } finally {

        setLoading(false);

      }

    };

    loadSpecialities();

  }, []);

  // ============================================================
  // SPECIALITIES SECTION RENDER
  // ============================================================

  return (
    <section className={sectionClass}>

      <div className={containerClass}>

        {/* Section header */}

        <div className={headerClass}>

          <p className={eyebrowClass}>
            Medical specialities
          </p>

          <h2 className={titleClass}>
            Find care by speciality
          </h2>

          <p className={descriptionClass}>
            Explore our medical specialities and discover the healthcare
            professionals available for each area of care.
          </p>

        </div>

        {/* Loading state */}

        {loading && (
          <p className={stateMessageClass}>
            Loading specialities...
          </p>
        )}

        {/* Error state */}

        {!loading && error && (
          <p className={errorMessageClass}>
            {error}
          </p>
        )}

        {/* Empty state */}

        {!loading && !error && specialities.length === 0 && (
          <p className={stateMessageClass}>
            No specialities available at the moment.
          </p>
        )}

        {/* Speciality cards */}

        {!loading && !error && specialities.length > 0 && (
          <div className={cardsContainerClass}>

            {specialities.slice(0, 3).map((speciality) => (

              <CardGen
                key={speciality.id}
                title={speciality.name}
                description={
                  speciality.description ||
                  "Explore healthcare professionals in this speciality."
                }
                className="h-full"
              />

            ))}

          </div>
        )}

        {/* View all */}

        {!loading && !error && specialities.length > 0 && (
          <div className={actionsClass}>

            <button
              type="button"
              className={buttonClass}
              onClick={() => navigate("/specialities")}
            >
              View all specialities
            </button>

          </div>
        )}

      </div>

    </section>
  );
};

export default SpecialitiesSection;