import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth.js";
import {
  getProfessionalAvailabilityRequest,
  createProfessionalAvailabilityRequest,
} from "../services/Availability.services.js";

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
  const availabilityCardClass = "rounded-xl border border-gray-200 p-4";
  const weekdayClass = "font-semibold text-gray-900";
  const availabilityContentClass =
    "mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between";
  const availabilityInfoClass = "flex flex-wrap gap-6 text-sm text-gray-600";
  const addButtonContainerClass = "flex justify-end";
  const addButtonClass =
    "rounded-lg bg-slate-800 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700";

  /* Add availability form styles */

  const formClass = "space-y-4 rounded-xl border border-gray-200 p-5";
  const formFieldClass = "flex flex-col gap-2";
  const formLabelClass = "text-sm font-medium text-gray-700";
  const formInputClass = "rounded-lg border border-gray-300 px-3 py-2";
  const timeFieldsClass = "grid gap-4 sm:grid-cols-2";
  const formActionsClass = "flex justify-end gap-3";
  const cancelButtonClass =
    "rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50";
  const saveButtonClass =
    "rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60";

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

  // Tracks whether the add availability form is visible.
  const [showForm, setShowForm] = useState(false);

  // Stores the values entered in the availability form.
  const [formData, setFormData] = useState({
    weekday: "MONDAY",
    start_time: "09:00",
    end_time: "13:00",
    slot_duration: 30,
  });

  // Tracks whether a new availability is being saved.
  const [saving, setSaving] = useState(false);

  // ============================================================
  // LOAD PROFESSIONAL AVAILABILITY
  // ============================================================

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProfessionalAvailabilityRequest(professionalId);

        setAvailabilities(data.availability || []);
      } catch (error) {
        console.error("Failed to load professional availability:", error);

        setAvailabilities([]);

        setError("Failed to load your availability schedule.");
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
  // CREATE AVAILABILITY
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError(null);

      const availabilityData = {
        weekday: formData.weekday,
        start_time: formData.start_time,
        end_time: formData.end_time,
        slot_duration: Number(formData.slot_duration),
      };

      const data = await createProfessionalAvailabilityRequest(
        professionalId,
        availabilityData,
      );

      setAvailabilities((previousAvailabilities) => [
        ...previousAvailabilities,
        data.availability,
      ]);

      setShowForm(false);

      setFormData({
        weekday: "MONDAY",
        start_time: "09:00",
        end_time: "13:00",
        slot_duration: 30,
      });
    } catch (error) {
      console.error("Failed to create professional availability:", error);

      setError(
        error.response?.data?.message || "Failed to create availability.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // AVAILABILITY FORM CHANGE
  // ============================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ============================================================
  // AVAILABILITY RENDER
  // ============================================================

  return (
    <div className={containerClass}>
      <p className={descriptionClass}>
        Define when patients can book appointments.
      </p>

      {/* Loading state */}
      {loading && <p className={loadingClass}>Loading availability...</p>}

      {/* Error state */}
      {!loading && error && <p className={errorClass}>{error}</p>}

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
            <article key={availability.id} className={availabilityCardClass}>
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

                  <span>{availability.slot_duration} min</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {!showForm && (
        <div className={addButtonContainerClass}>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className={addButtonClass}
          >
            + Add availability
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className={formClass}>
          <div className={formFieldClass}>
            <label htmlFor="weekday" className={formLabelClass}>
              Day
            </label>

            <select
              id="weekday"
              name="weekday"
              value={formData.weekday}
              onChange={handleChange}
              className={formInputClass}
            >
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>

          <div className={timeFieldsClass}>
            <div className={formFieldClass}>
              <label htmlFor="start_time" className={formLabelClass}>
                Start
              </label>

              <input
                id="start_time"
                name="start_time"
                type="time"
                value={formData.start_time}
                onChange={handleChange}
                className={formInputClass}
              />
            </div>

            <div className={formFieldClass}>
              <label htmlFor="end_time" className={formLabelClass}>
                End
              </label>

              <input
                id="end_time"
                name="end_time"
                type="time"
                value={formData.end_time}
                onChange={handleChange}
                className={formInputClass}
              />
            </div>
          </div>

          <div className={formFieldClass}>
            <label htmlFor="slot_duration" className={formLabelClass}>
              Slot duration
            </label>

            <select
              id="slot_duration"
              name="slot_duration"
              value={formData.slot_duration}
              onChange={handleChange}
              className={formInputClass}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>

          <div className={formActionsClass}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={cancelButtonClass}
            >
              Cancel
            </button>

            <button type="submit" disabled={saving} className={saveButtonClass}>
              {saving ? "Saving..." : "Save availability"}
            </button>
          </div>
        </form>
      )}
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

  return weekday.charAt(0) + weekday.slice(1).toLowerCase();
};

export default ProfessionalAvailability;
