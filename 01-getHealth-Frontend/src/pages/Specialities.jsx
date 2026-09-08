import { useEffect, useState } from "react";
import { getSpecialities } from "../services/Speciality.services.js";
import SpecialitiesCarousel from "../components/SpecialitiesCarousel.jsx";

// ============================================================
// SPECIALITIES PAGE COMPONENT
// ============================================================

// Displays the specialities page with the available healthcare
// specialities retrieved from the backend API.
const Specialities = () => {
  /* Preset Tailwind Styles */

  const pageClass = "flex-1 bg-slate-950 px-4 py-16 sm:px-6 lg:px-8";
  const sectionClass = "mx-auto max-w-7xl";
  const headerClass = "mb-10";
  const eyebrowClass =
    "text-sm font-semibold uppercase tracking-wider text-violet-400";
  const titleClass =
    "mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl";
  const descriptionClass = "mt-3 max-w-2xl text-base leading-7 text-slate-300";
  const contentClass = "mt-10";
  const stateCardClass =
    "rounded-2xl border border-slate-700 bg-slate-800 px-6 py-10 text-center shadow-sm";
  const stateTextClass = "text-sm text-slate-400";
  const errorCardClass =
    "rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center";
  const errorTextClass = "text-sm text-red-300";

  const selectedCardClass =
    "mb-10 flex min-h-100 flex-col justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 p-8 shadow-sm";
  const selectedLabelClass =
    "text-xs font-bold uppercase tracking-wider text-violet-400";
  const selectedTitleClass = "mt-2 text-2xl font-bold text-slate-100";
  const selectedDescriptionClass =
    "mt-3 max-w-3xl text-sm leading-6 text-slate-300";
  const carouselTitleClass = "mb-5 text-xl font-semibold text-slate-100";

  const successContentClass = "flex min-h-[60vh] flex-col";
  const selectedSectionClass = "mb-10";
  const carouselSectionClass = "mt-auto pt-10";

  // ============================================================
  // SPECIALITIES STATE
  // ============================================================

  // Stores the healthcare specialities retrieved from the backend API.
  const [specialities, setSpecialities] = useState([]);

  // Stores the currently selected speciality.
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  // Stores the loading state while specialities are being fetched.
  const [loading, setLoading] = useState(true);

  // Stores the error state in case the API request fails.
  const [error, setError] = useState(false);

  // ============================================================
  // LOAD SPECIALITIES
  // ============================================================

  // Retrieves the available healthcare specialities from the API
  // when the Specialities page is mounted.
  useEffect(() => {
    const loadSpecialities = async () => {
      try {
        // Requests the specialities from the backend service.
        const data = await getSpecialities();

        // Stores the returned specialities or an empty array
        // if the response does not contain valid speciality data.
        const specialityData = Array.isArray(data) ? data : [];

        setSpecialities(specialityData);

        if (specialityData.length > 0) {
          setSelectedSpeciality(specialityData[0]);
        }
      } catch (error) {
        // Handles errors generated while requesting the specialities.
        console.error("Error loading specialities:", error);

        // Resets the specialities collection after a failed request.
        setSpecialities([]);

        // Activates the error state so the page can display feedback.
        setError(true);
      } finally {
        // Ends the loading state after the request is completed.
        setLoading(false);
      }
    };

    loadSpecialities();
  }, []);

  // ============================================================
  // SPECIALITIES PAGE RENDER
  // ============================================================

  // Renders the page header and the specialities carousel together
  // with loading, error, and empty states.
  return (
    <main className={pageClass}>
      <section className={sectionClass}>
        {/* ============================================================
            PAGE HEADER
            ============================================================ */}

        {/* Displays the page title and description. */}
        <div className={headerClass}>
          <p className={eyebrowClass}>Medical Specialities</p>

          <h1 className={titleClass}>Explore our specialities</h1>

          <p className={descriptionClass}>
            Discover the healthcare areas available at getHealth and find the
            speciality that best matches your needs.
          </p>
        </div>

        {/* ============================================================
            SPECIALITIES CONTENT
            ============================================================ */}

        {/* Displays the current state of the specialities request. */}
        <div className={contentClass}>
          {/* Displays a loading message while specialities are being fetched. */}
          {loading && (
            <div className={stateCardClass}>
              <p className={stateTextClass}>Loading specialities...</p>
            </div>
          )}

          {/* Displays an error message when the specialities request fails. */}
          {!loading && error && (
            <div className={errorCardClass}>
              <p className={errorTextClass}>
                Failed to load specialities. Please try again later.
              </p>
            </div>
          )}

          {/* Displays an empty state when the API returns no specialities. */}
          {!loading && !error && specialities.length === 0 && (
            <div className={stateCardClass}>
              <p className={stateTextClass}>
                No specialities available at the moment.
              </p>
            </div>
          )}

          {/* Displays the specialities carousel when data is available. */}
          {!loading && !error && specialities.length > 0 && (
            <div className={successContentClass}>
              {/* Selected speciality */}

              <div className={selectedSectionClass}>
                {selectedSpeciality && (
                  <div className={selectedCardClass}>
                    <p className={selectedLabelClass}>Selected Speciality</p>

                    <h2 className={selectedTitleClass}>
                      {selectedSpeciality.name}
                    </h2>
                    <p
                      className={`${selectedDescriptionClass} w-full max-w-none text-xl leading-relaxed`}
                    >
                      {selectedSpeciality.detailed_description ||
                        "No detailed description available for this speciality."}
                    </p>
                  </div>
                )}
              </div>

              {/* Specialities carousel */}

              <div className={carouselSectionClass}>
                <h2 className={carouselTitleClass}>More Specialities</h2>

                <SpecialitiesCarousel
                  specialities={specialities}
                  onSelectSpeciality={setSelectedSpeciality}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Specialities;
