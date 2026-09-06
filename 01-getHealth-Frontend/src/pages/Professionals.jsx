import { useEffect, useState } from "react";

import { getProfessionalsRequest } from "../services/Professional.services.js";

import ProfessionalsCarousel from "../components/ProfessionalsCarousel.jsx";

// ============================================================
// PROFESSIONALS PAGE COMPONENT
// ============================================================

// Displays the professionals page with the registered healthcare
// professionals retrieved from the backend API.

const Professionals = () => {

  /* Preset Tailwind Styles */

  const pageClass = "flex-1 bg-slate-950 px-4 py-16 sm:px-6 lg:px-8";
  const sectionClass = "mx-auto max-w-7xl";
  const headerClass = "mb-10";
  const eyebrowClass = "text-sm font-semibold uppercase tracking-wider text-violet-400";
  const titleClass = "mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl";
  const descriptionClass = "mt-3 max-w-2xl text-base leading-7 text-slate-300";
  const contentClass = "mt-10";
  const stateCardClass = "rounded-2xl border border-slate-700 bg-slate-800 px-6 py-10 text-center shadow-sm";
  const stateTextClass = "text-sm text-slate-400";
  const errorCardClass = "rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center";
  const errorTextClass = "text-sm text-red-300";

  // ============================================================
  // PROFESSIONALS STATE
  // ============================================================

  // Stores the healthcare professionals retrieved from the backend API.
  const [professionals, setProfessionals] = useState([]);

  // Stores the loading state while professionals are being fetched.
  const [loading, setLoading] = useState(true);

  // Stores the error state in case the API request fails.
  const [error, setError] = useState(false);

  // ============================================================
  // LOAD PROFESSIONALS
  // ============================================================

  // Retrieves the registered healthcare professionals from the API
  // when the Professionals page is mounted.
  useEffect(() => {

    const loadProfessionals = async () => {

      try {

        // Requests the professionals from the backend service.
        const data = await getProfessionalsRequest();

        // Stores the returned professionals or an empty array
        // if the response does not contain professional data.
        setProfessionals(data.professionals || []);

      } catch (error) {

        // Handles errors generated while requesting the professionals.
        console.error("Error loading professionals:", error);

        // Resets the professionals collection after a failed request.
        setProfessionals([]);

        // Activates the error state so the page can display feedback.
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

  // Renders the page header and the professionals carousel together
  // with loading, error, and empty states.
  return (
    <main className={pageClass}>

      <section className={sectionClass}>

        {/* ============================================================
            PAGE HEADER
            ============================================================ */}

        {/* Displays the page title and description. */}
        <div className={headerClass}>

          <p className={eyebrowClass}>
            Healthcare Professionals
          </p>

          <h1 className={titleClass}>
            Find a professional
          </h1>

          <p className={descriptionClass}>
            Explore our healthcare professionals, learn more about their
            specialties and choose the right care for your needs.
          </p>

        </div>

        {/* ============================================================
            PROFESSIONALS CONTENT
            ============================================================ */}

        {/* Displays the current state of the professionals request. */}
        <div className={contentClass}>

          {/* Displays a loading message while professionals are being fetched. */}
          {loading && (

            <div className={stateCardClass}>

              <p className={stateTextClass}>
                Loading professionals...
              </p>

            </div>

          )}

          {/* Displays an error message when the professionals request fails. */}
          {!loading && error && (

            <div className={errorCardClass}>

              <p className={errorTextClass}>
                Unable to load professionals. Please try again later.
              </p>

            </div>

          )}

          {/* Displays an empty state when the API returns no professionals. */}
          {!loading && !error && professionals.length === 0 && (

            <div className={stateCardClass}>

              <p className={stateTextClass}>
                No professionals available at the moment.
              </p>

            </div>

          )}

          {/* Displays the professionals carousel when data is available. */}
          {!loading && !error && professionals.length > 0 && (

            <ProfessionalsCarousel
              professionals={professionals}
            />

          )}

        </div>

      </section>

    </main>
  );
};

export default Professionals;