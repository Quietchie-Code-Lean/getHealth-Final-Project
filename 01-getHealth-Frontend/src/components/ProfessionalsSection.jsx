import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardGen from "./CardGen.jsx";
import { getProfessionalsRequest } from "../services/Professional.services.js";

// ============================================================
// PROFESSIONALS SECTION COMPONENT
// ============================================================

// Displays a preview of professionals retrieved from the backend.
const ProfessionalsSection = () => {

  const navigate = useNavigate();

  /* Preset Tailwind Styles */

  const sectionClass = "bg-slate-950 py-16 sm:py-20";
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
  // PROFESSIONALS STATE
  // ============================================================

  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================================
  // LOAD PROFESSIONALS
  // ============================================================

  useEffect(() => {

    const loadProfessionals = async () => {

      try {

        setLoading(true);
        setError(null);

        const data = await getProfessionalsRequest();

        setProfessionals(data.professionals || []);

      } catch (error) {

        console.error("Failed to load professionals:", error);

        setProfessionals([]);
        setError("Failed to load professionals.");

      } finally {

        setLoading(false);

      }
    };

    loadProfessionals();

  }, []);

  // ============================================================
  // PROFESSIONALS SECTION RENDER
  // ============================================================

  return (
    <section className={sectionClass}>

      <div className={containerClass}>

        {/* Section header */}

        <div className={headerClass}>

          <p className={eyebrowClass}>
            Healthcare professionals
          </p>

          <h2 className={titleClass}>
            Meet our professionals
          </h2>

          <p className={descriptionClass}>
            Explore our healthcare professionals and find the care that
            best matches your needs.
          </p>

        </div>

        {/* ============================================================
            LOADING STATE
            ============================================================ */}

        {loading && (
          <p className={stateMessageClass}>
            Loading professionals...
          </p>
        )}

        {/* ============================================================
            ERROR STATE
            ============================================================ */}

        {!loading && error && (
          <p className={errorMessageClass}>
            {error}
          </p>
        )}

        {/* ============================================================
            EMPTY STATE
            ============================================================ */}

        {!loading && !error && professionals.length === 0 && (
          <p className={stateMessageClass}>
            No professionals available at the moment.
          </p>
        )}

        {/* ============================================================
            PROFESSIONAL CARDS
            ============================================================ */}

        {!loading && !error && professionals.length > 0 && (
          <div className={cardsContainerClass}>

            {professionals.slice(0, 3).map((professional) => (

              <div
                key={professional.id}
                onClick={() =>
                  navigate(`/professionals/${professional.id}`)
                }
                className="cursor-pointer">

                <CardGen
                  title={`${professional.first_name} ${professional.last_name}`}
                  description={
                    professional.specialties?.length > 0
                      ? professional.specialties
                        .map((specialty) => specialty.name)
                        .join(", ")
                      : "Healthcare professional"
                  }
                  className="h-full">

                  {professional.biography && (
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
                      {professional.biography}
                    </p>
                  )}

                </CardGen>

              </div>

            ))}

          </div>
        )}

        {/* ============================================================
            VIEW ALL PROFESSIONALS
            ============================================================ */}

        {!loading && !error && professionals.length > 0 && (
          <div className={actionsClass}>

            <button
              type="button"
              className={buttonClass}
              onClick={() => navigate("/professionals")}>
              View all professionals
            </button>

          </div>
        )}

      </div>

    </section>
  );
};

export default ProfessionalsSection;
