import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getProfessionalAvailabilityRequest } from "../services/Availability.services.js";

// ============================================================
// PROFESSIONAL AVAILABILITY COMPONENT
// ============================================================

const ProfessionalAvailability = () => {

  /* Preset Tailwind styles */
  const containerClass = "space-y-5";
  const descriptionClass = "text-sm text-gray-500";
  const loadingClass = "text-sm text-gray-500";
  const errorClass = "text-sm text-red-600";
  const emptyClass = "text-sm text-gray-500";
  const listClass = "space-y-4";
  const availabilityCardClass ="rounded-xl border border-gray-200 p-4";
  const weekdayClass = "font-semibold text-gray-900";
  const availabilityContentClass = "mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between";
  const availabilityInfoClass = "flex flex-wrap gap-6 text-sm text-gray-600";
  const addButtonContainerClass = "flex justify-end";
  const addButtonClass = "rounded-lg bg-slate-800 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700";


  // ============================================================
  // AUTHENTICATION
  // ============================================================

  // Provides access to the authenticated professional.
  const { user } = useAuth();

  const professionalId = user?.id;


  // ============================================================
  // AVAILABILITY STATE
  // ============================================================

  // Stores the professional's recurring availability schedules.
  const [availabilities, setAvailabilities] = useState([]);

  // Tracks whether availability is currently being loaded.
  const [loading, setLoading] = useState(true);

  // Stores an error message when availability cannot be loaded.
  const [error, setError] = useState(null);


  // ============================================================
  // LOAD PROFESSIONAL AVAILABILITY
  // ============================================================

  useEffect(() => {

    const loadAvailability = async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await getProfessionalAvailabilityRequest(professionalId);

        setAvailabilities(data.availability || []);

      } catch (error) {

        console.error(
          "Failed to load professional availability:",
          error
        );

        setAvailabilities([]);

        setError(
          "Failed to load your availability schedule."
        );

      } finally {

        setLoading(false);

      }

    };


    if (professionalId) {
      loadAvailability();
    } else {

      setLoading(false);

    }

  }, [professionalId]);


  // ============================================================
  // AVAILABILITY RENDER
  // ============================================================

  return (

    <div className={containerClass}>

      <p className={descriptionClass}>
        Define when patients can book appointments.
      </p>


      {/* Loading state */}
      {loading && (
        <p className={loadingClass}>
          Loading availability...
        </p>
      )}


      {/* Error state */}
      {!loading && error && (
        <p className={errorClass}>
          {error}
        </p>
      )}


      {/* Empty state */}
      {!loading && !error && availabilities.length === 0 && (
        <p className={emptyClass}>
          You have not configured any availability yet.
        </p>
      )}


      {/* Availability list */}
      {!loading && !error && availabilities.length > 0 && (

        <div className={listClass}>

          {availabilities.map((availability) => (

            <article
              key={availability.id}
              className={availabilityCardClass}>

              <p className={weekdayClass}>
                {formatWeekday(availability.weekday)}
              </p>


              <div className={availabilityContentClass}>

                <div className={availabilityInfoClass}>

                  <span>
                    {availability.start_time}
                    {" - "}
                    {availability.end_time}
                  </span>

                  <span>
                    {availability.slot_duration} min
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}


      {/* Future add availability action */}
      <div className={addButtonContainerClass}>

        <button type="button" className={addButtonClass}>
          + Add availability
        </button>

      </div>

    </div>

  );

};


// ============================================================
// WEEKDAY FORMATTER
// ============================================================

const formatWeekday = (weekday) => {

  if (!weekday) {
    return "";
  }

  return (
    weekday.charAt(0) +
    weekday.slice(1).toLowerCase()
  );

};


export default ProfessionalAvailability;