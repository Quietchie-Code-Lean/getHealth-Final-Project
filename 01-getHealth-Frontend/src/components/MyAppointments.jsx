import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth.js";
import { getMyAppointmentsRequest } from "../services/Appointment.services.js";
import { formatAppointmentDate, formatAppointmentTime } from "../utils/dateTime.utils.js";

// ============================================================
// MY APPOINTMENTS COMPONENT
// ============================================================

// Displays the appointments associated with the authenticated patient.
const MyAppointments = () => {
  
  /* Preset Tailwind styles */
  const sectionClass = "rounded-2xl bg-white p-6 shadow-sm";
  const titleClass = "mb-5 text-xl font-semibold text-gray-900";
  const loadingClass = "text-sm text-gray-500";
  const errorClass = "text-sm text-red-600";
  const emptyClass = "text-sm text-gray-500";
  const listClass = "space-y-4";
  const appointmentCardClass = "rounded-xl border border-gray-200 p-4";
  const appointmentGridClass = "grid grid-cols-1 gap-3 md:grid-cols-2";
  const appointmentInfoClass = "text-sm text-gray-600";
  const appointmentLabelClass = "font-medium text-gray-900";
  const statusClass = "text-sm font-medium text-slate-700";
  const reasonClass = "mt-4 text-sm text-gray-600";

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  // Provides access to the authenticated patient's token.
  const { user, authLoading } = useAuth();
  // ============================================================
  // APPOINTMENTS STATE
  // ============================================================

  // Stores the authenticated patient's appointments.
  const [appointments, setAppointments] = useState([]);

  // Tracks whether appointments are currently being loaded.
  const [loading, setLoading] = useState(true);

  // Stores an error message when appointments cannot be loaded.
  const [error, setError] = useState(null);

  // ============================================================
  // LOAD PATIENT APPOINTMENTS
  // ============================================================

  // Loads all appointments associated with the authenticated patient.
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyAppointmentsRequest();

        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Failed to load patient appointments:", error);
        setAppointments([]);
        setError("Failed to load your appointments.");
      } finally {
        setLoading(false);
      }
    };

    if (authLoading) {
      return;
    }

    if (user) {
      loadAppointments();
    } else {
      setAppointments([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  // ============================================================
  // APPOINTMENTS RENDER
  // ============================================================

  return (
    <section className={sectionClass}>
      <h2 className={titleClass}>My Appointments</h2>

      {/* Loading state */}
      {loading && <p className={loadingClass}>Loading appointments...</p>}

      {/* Error state */}
      {!loading && error && <p className={errorClass}>{error}</p>}

      {/* Empty state */}
      {!loading && !error && appointments.length === 0 && (
        <p className={emptyClass}>
          You do not have any scheduled appointments.
        </p>
      )}

      {/* Appointments list */}
      {!loading && !error && appointments.length > 0 && (
        <div className={listClass}>
          {appointments.map((appointment) => (
            <article key={appointment.id} className={appointmentCardClass}>
              <div className={appointmentGridClass}>
                <p className={appointmentInfoClass}>
                  <span className={appointmentLabelClass}>Date:</span>{" "}
                  {formatAppointmentDate(appointment.appointment_date)}
                </p>

                <p className={appointmentInfoClass}>
                  <span className={appointmentLabelClass}>Time:</span>{" "}
                  {formatAppointmentTime(appointment.start_time)} -{" "}
                  {formatAppointmentTime(appointment.end_time)}
                </p>

                <p className={statusClass}>
                  <span className={appointmentLabelClass}>Status:</span>{" "}
                  {appointment.status}
                </p>

                <p className={appointmentInfoClass}>
                  <span className={appointmentLabelClass}>Specialty:</span>{" "}
                  {appointment.specialty?.name}
                </p>

                <p className={appointmentInfoClass}>
                  <span className={appointmentLabelClass}>Professional:</span>{" "}
                  {appointment.professional?.first_name}{" "}
                  {appointment.professional?.last_name}
                </p>

                <p className={appointmentInfoClass}>
                  <span className={appointmentLabelClass}>Patient:</span>{" "}
                  {appointment.patient?.first_name}{" "}
                  {appointment.patient?.last_name}
                </p>
              </div>

              {appointment.reason && (
                <p className={reasonClass}>
                  <span className={appointmentLabelClass}>Reason:</span>{" "}
                  {appointment.reason}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAppointments;
