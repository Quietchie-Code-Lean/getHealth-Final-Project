import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import ProfileField from "../components/ProfileField";
import MyAppointments from "../components/MyAppointments";

// ============================================================
// PATIENT PROFILE COMPONENT
// ============================================================

const PatientProfile = () => {
  /* Preset Tailwind styles */

  const mainClass = "min-h-[70vh] bg-gray-50 px-4 py-10";
  const sectionClass = "mx-auto max-w-5xl";
  const headerClass = "mb-6 rounded-2xl bg-white p-6 shadow-sm";
  const headerContentClass =
    "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";
  const profileTypeClass =
    "mb-1 text-sm font-medium uppercase tracking-wide text-blue-600";
  const nameClass = "text-3xl font-bold text-gray-900";
  const emailClass = "mt-1 text-gray-500";
  const headerActionsClass = "flex items-center gap-3";
  const activeStatusClass =
    "w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700";
  const inactiveStatusClass =
    "w-fit rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700";
  const profileLayoutClass = "grid gap-6 lg:grid-cols-[300px_1fr]";
  const cardClass = "rounded-2xl bg-white p-6 shadow-sm";
  const sectionTitleClass = "mb-5 text-xl font-semibold text-gray-900";
  const subsectionTitleClass =
    "mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500";
  const fieldsContainerClass = "space-y-4";
  const dividerClass = "my-6 border-t border-gray-200";
  const appointmentsColumnClass = "space-y-6";
  const scheduleCardClass = "rounded-2xl bg-white p-6 shadow-sm";
  const scheduleContentClass =
    "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between";
  const scheduleTextClass = "text-gray-500";
  const appointmentButtonClass =
    "rounded-lg bg-slate-800 px-5 py-2.5 text-center font-medium text-white transition hover:bg-slate-700";
  const logoutButtonClass =
    "rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50";

  // Provides access to the authenticated patient and logout action.
  const { user, logout } = useAuth();

  const profile = user.profile;

  // ============================================================
  // PATIENT PROFILE RENDER
  // ============================================================

  return (
    <main className={mainClass}>
      <section className={sectionClass}>
        {/* Patient profile header */}
        <div className={headerClass}>
          <div className={headerContentClass}>
            <div>
              <p className={profileTypeClass}>Patient Profile</p>

              <h1 className={nameClass}>
                {user.firstName} {user.lastName}
              </h1>

              <p className={emailClass}>{user.email}</p>
            </div>

            <div className={headerActionsClass}>
              <span
                className={
                  user.isActive ? activeStatusClass : inactiveStatusClass
                }
              >
                {user.isActive ? "Active account" : "Inactive account"}
              </span>

              <button
                type="button"
                onClick={logout}
                className={logoutButtonClass}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Patient profile layout */}
        <div className={profileLayoutClass}>
          {/* Profile information */}
          <aside className={cardClass}>
            <h2 className={sectionTitleClass}>Profile Information</h2>

            {/* Account information */}
            <div>
              <h3 className={subsectionTitleClass}>Account</h3>

              <div className={fieldsContainerClass}>
                <ProfileField label="First name" value={user.firstName} />

                <ProfileField label="Last name" value={user.lastName} />

                <ProfileField label="Email" value={user.email} />

                <ProfileField label="Role" value={user.role} />
              </div>
            </div>

            <div className={dividerClass} />

            {/* Patient information */}
            <div>
              <h3 className={subsectionTitleClass}>Patient</h3>

              <div className={fieldsContainerClass}>
                <ProfileField label="Phone" value={profile?.phone} />

                <ProfileField
                  label="Date of birth"
                  value={formatDate(profile?.dateOfBirth)}
                />

                <ProfileField
                  label="Identification number"
                  value={profile?.identificationNumber}
                />
              </div>
            </div>
          </aside>

          {/* Appointment area */}
          <div className={appointmentsColumnClass}>
            {/* Schedule appointment */}
            <div className={scheduleCardClass}>
              <div className={scheduleContentClass}>
                <div>
                  <h2 className={sectionTitleClass}>Schedule Appointment</h2>

                  <p className={scheduleTextClass}>
                    Find a healthcare professional and book an available
                    appointment.
                  </p>
                </div>

                <Link to="/appointments/new" className={appointmentButtonClass}>
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Patient appointments */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}>My Appointments</h2>

              <MyAppointments />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================================
// DATE FORMATTER
// ============================================================

// Converts stored dates into a readable local date format.
const formatDate = (date) => {
  if (!date) {
    return "Not provided";
  }

  return new Date(date).toLocaleDateString();
};

export default PatientProfile;
