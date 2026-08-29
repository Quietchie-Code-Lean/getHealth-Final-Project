import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import ProfileField from "../components/ProfileField";

// ============================================================
// PATIENT PROFILE COMPONENT
// ============================================================

const PatientProfile = () => {
  /* Preset Tailwind styles */
  const mainClass = "min-h-[70vh] bg-gray-50 px-4 py-10";
  const sectionClass = "mx-auto max-w-3xl";

  const cardClass =
    "mb-6 rounded-2xl bg-white p-6 shadow-sm";

  const headerContentClass =
    "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";

  const profileTypeClass =
    "mb-1 text-sm font-medium uppercase tracking-wide text-blue-600";

  const nameClass = "text-3xl font-bold text-gray-900";
  const emailClass = "mt-1 text-gray-500";

  const activeStatusClass =
    "w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700";

  const inactiveStatusClass =
    "w-fit rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700";

  const sectionTitleClass =
    "mb-5 text-xl font-semibold text-gray-900";

  const fieldsGridClass =
    "grid gap-5 sm:grid-cols-2";

  const actionsContainerClass =
    "flex flex-col gap-3 sm:flex-row sm:justify-end";

  const appointmentButtonClass =
    "rounded-lg bg-slate-800 px-5 py-2.5 text-center font-medium text-white transition hover:bg-slate-700";

  const logoutButtonClass =
    "rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700";

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
        <div className={cardClass}>

          <div className={headerContentClass}>
            <div>

              <p className={profileTypeClass}>Patient Profile</p>
              <h1 className={nameClass}>{user.firstName}{user.lastName}</h1>
              <p className={emailClass}>{user.email}</p>

            </div>

            <span
              className={
                user.isActive
                  ? activeStatusClass
                  : inactiveStatusClass
              }
            >
              {user.isActive
                ? "Active account"
                : "Inactive account"}
            </span>

          </div>
        </div>

        {/* Account information */}
        <div className={cardClass}>

          <h2 className={sectionTitleClass}>
            Account Information
          </h2>

          <div className={fieldsGridClass}>
            <ProfileField
              label="First name"
              value={user.firstName}/>

            <ProfileField
              label="Last name"
              value={user.lastName}/>

            <ProfileField
              label="Email"
              value={user.email}/>

            <ProfileField
              label="Role"
              value={user.role}/>
          </div>
        </div>

        {/* Patient information */}
        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            Patient Information
          </h2>

          <div className={fieldsGridClass}>
            <ProfileField
              label="Phone"
              value={profile?.phone}/>

            <ProfileField
              label="Date of birth"
              value={formatDate(profile?.dateOfBirth)}/>

            <ProfileField
              label="Identification number"
              value={profile?.identificationNumber}/>
          </div>
        </div>

        {/* Patient actions */}
        <div className={actionsContainerClass}>
          <Link
            to="/appointments"
            className={appointmentButtonClass}>
            My Appointments
          </Link>

          <button
            type="button"
            onClick={logout}
            className={logoutButtonClass}>
            Logout
          </button>
          
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