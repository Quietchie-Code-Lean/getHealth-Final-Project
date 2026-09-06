import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProfessionalByIdRequest } from "../services/Professional.services.js";

// ============================================================
// PROFESSIONAL DETAILS COMPONENT
// ============================================================

// Displays the complete public profile of a selected professional.
const ProfessionalDetails = () => {

  /* Preset Tailwind Styles */

  const pageClass = "flex-1 bg-slate-950 px-4 py-10";
  const sectionClass = "mx-auto max-w-6xl";
  const backButtonClass = "mb-6 inline-flex items-center text-sm font-semibold text-violet-400 transition hover:text-violet-300";
  const profileContainerClass = "overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-sm";
  const profileHeaderClass = "bg-gradient-to-r from-slate-900 via-slate-900 to-violet-950/40 px-6 py-8 sm:px-8";
  const profileHeaderContentClass = "flex flex-col gap-5 sm:flex-row sm:items-center";
  const avatarClass = "flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-4 border-slate-800 bg-violet-500/15 text-2xl font-bold text-violet-300 shadow-sm";
  const profileTypeClass = "mb-1 text-xs font-bold uppercase tracking-wider text-violet-400";
  const nameClass = "text-3xl font-bold tracking-tight text-slate-100";
  const profileDescriptionClass = "mt-2 text-sm text-slate-400";
  const actionContainerClass = "mt-5 flex flex-wrap gap-3";
  const appointmentButtonClass = "rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500";
  const professionalsButtonClass = "rounded-lg border border-slate-600 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700";
  const profileGridClass = "grid grid-cols-1 gap-4 p-6 sm:p-8 md:grid-cols-2";
  const infoCardBaseClass = "rounded-xl border px-4 py-4";
  const infoContentClass = "flex items-start gap-3";
  const infoIconClass = "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg shadow-sm";
  const infoTextContainerClass = "min-w-0";
  const infoTitleClass = "text-xs font-bold uppercase tracking-wide";
  const infoValueClass = "mt-1 break-words text-sm font-medium leading-6 text-slate-200";
  const loadingCardClass = "rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-sm";
  const loadingTextClass = "text-sm text-slate-400";
  const errorCardClass = "rounded-2xl border border-red-500/30 bg-red-500/10 p-8 shadow-sm";
  const errorTitleClass = "text-xl font-bold text-slate-100";
  const errorTextClass = "mt-2 text-sm text-slate-400";

  // ============================================================
  // ROUTE AND NAVIGATION
  // ============================================================

  const { id } = useParams();

  const navigate = useNavigate();

  // ============================================================
  // PROFESSIONAL STATE
  // ============================================================

  const [professional, setProfessional] = useState(null);

  const [error, setError] = useState(false);

  // ============================================================
  // LOAD PROFESSIONAL
  // ============================================================

  useEffect(() => {

    const loadProfessional = async () => {

      try {

        const data = await getProfessionalByIdRequest(id);

        setProfessional(data.professional);

      } catch (error) {

        console.error("Error loading professional:", error);

        setError(true);

      }

    };

    loadProfessional();

  }, [id]);

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (!professional && !error) {

    return (
      <main className={pageClass}>

        <section className={sectionClass}>

          <div className={loadingCardClass}>

            <p className={loadingTextClass}>
              Loading professional profile...
            </p>

          </div>

        </section>

      </main>
    );

  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error) {

    return (
      <main className={pageClass}>

        <section className={sectionClass}>

          <button
            type="button"
            onClick={() => navigate("/professionals")}
            className={backButtonClass}
          >
            ← Back to professionals
          </button>

          <div className={errorCardClass}>

            <h1 className={errorTitleClass}>
              Professional profile
            </h1>

            <p className={errorTextClass}>
              Unable to load professional profile. Please try again later.
            </p>

          </div>

        </section>

      </main>
    );

  }

  // ============================================================
  // PROFESSIONAL DATA
  // ============================================================

  const fullName = `${professional.first_name} ${professional.last_name}`;

  const specialties =
    professional.specialties
      ?.map((specialty) => specialty.name)
      .join(", ") || "No specialties available";

  const initials = `${professional.first_name?.[0] || ""}${professional.last_name?.[0] || ""}`;

  // ============================================================
  // PROFESSIONAL PROFILE RENDER
  // ============================================================

  return (
    <main className={pageClass}>

      <section className={sectionClass}>

        {/* ============================================================
            BACK NAVIGATION
        ============================================================ */}

        <button
          type="button"
          onClick={() => navigate("/professionals")}
          className={backButtonClass}>
          ← Back to professionals
        </button>

        {/* ============================================================
            PROFILE CONTAINER
        ============================================================ */}

        <div className={profileContainerClass}>

          {/* ============================================================
              PROFILE HEADER
          ============================================================ */}

          <div className={profileHeaderClass}>

            <div className={profileHeaderContentClass}>

              {/* Professional avatar */}

              <div className={avatarClass}>
                {initials}
              </div>

              {/* Professional identity */}

              <div>

                <p className={profileTypeClass}>
                  Healthcare Professional
                </p>

                <h1 className={nameClass}>
                  {fullName}
                </h1>

                <p className={profileDescriptionClass}>
                  {specialties}
                </p>

                {/* Patient actions */}

                <div className={actionContainerClass}>

                  <button
                    type="button"
                    onClick={() => navigate("/appointments/new")}
                    className={appointmentButtonClass}>
                    Book Appointment
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/professionals")}
                    className={professionalsButtonClass}>
                    View Professionals
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* ============================================================
              PROFILE INFORMATION
          ============================================================ */}

          <div className={profileGridClass}>

            <ProfileInfo
              title="Name"
              value={fullName}
              icon="👤"
              className="border-violet-500/20 bg-violet-500/10"
              titleClass="text-violet-300"
              baseClass={infoCardBaseClass}
              contentClass={infoContentClass}
              iconClass={infoIconClass}
              textContainerClass={infoTextContainerClass}
              infoTitleClass={infoTitleClass}
              valueClass={infoValueClass}
            />

            <ProfileInfo
              title="Specialties"
              value={specialties}
              icon="🩺"
              className="border-emerald-500/20 bg-emerald-500/10"
              titleClass="text-emerald-300"
              baseClass={infoCardBaseClass}
              contentClass={infoContentClass}
              iconClass={infoIconClass}
              textContainerClass={infoTextContainerClass}
              infoTitleClass={infoTitleClass}
              valueClass={infoValueClass}
            />

            <ProfileInfo
              title="License Number"
              value={professional.license_number || "Not provided"}
              icon="📋"
              className="border-violet-500/20 bg-violet-500/10"
              titleClass="text-violet-300"
              baseClass={infoCardBaseClass}
              contentClass={infoContentClass}
              iconClass={infoIconClass}
              textContainerClass={infoTextContainerClass}
              infoTitleClass={infoTitleClass}
              valueClass={infoValueClass}
            />

            <ProfileInfo
              title="Biography"
              value={professional.biography || "No biography available"}
              icon="📝"
              className="border-amber-500/20 bg-amber-500/10"
              titleClass="text-amber-300"
              baseClass={infoCardBaseClass}
              contentClass={infoContentClass}
              iconClass={infoIconClass}
              textContainerClass={infoTextContainerClass}
              infoTitleClass={infoTitleClass}
              valueClass={infoValueClass}
            />

            <ProfileInfo
              title="Date of Birth"
              value={formatDate(professional.date_of_birth)}
              icon="📅"
              className="border-pink-500/20 bg-pink-500/10"
              titleClass="text-pink-300"
              baseClass={infoCardBaseClass}
              contentClass={infoContentClass}
              iconClass={infoIconClass}
              textContainerClass={infoTextContainerClass}
              infoTitleClass={infoTitleClass}
              valueClass={infoValueClass}
            />

            <ProfileInfo
              title="Identification Number"
              value={professional.identification_number || "Not provided"}
              icon="🪪"
              className="border-indigo-500/20 bg-indigo-500/10"
              titleClass="text-indigo-300"
              baseClass={infoCardBaseClass}
              contentClass={infoContentClass}
              iconClass={infoIconClass}
              textContainerClass={infoTextContainerClass}
              infoTitleClass={infoTitleClass}
              valueClass={infoValueClass}
            />

            <ProfileInfo
              title="Approval Status"
              value={professional.approval_status || "Not provided"}
              icon="✓"
              className="border-emerald-500/20 bg-emerald-500/10"
              titleClass="text-emerald-300"
              baseClass={infoCardBaseClass}
              contentClass={infoContentClass}
              iconClass={infoIconClass}
              textContainerClass={infoTextContainerClass}
              infoTitleClass={infoTitleClass}
              valueClass={infoValueClass}
            />

          </div>

        </div>

      </section>

    </main>
  );
};

// ============================================================
// PROFILE INFORMATION COMPONENT
// ============================================================


const ProfileInfo = ({
  title,
  value,
  icon,
  className,
  titleClass,
  baseClass,
  contentClass,
  iconClass,
  textContainerClass,
  infoTitleClass,
  valueClass,
}) => {

  return (
    <div className={`${baseClass} ${className}`}>

      <div className={contentClass}>

        <div className={iconClass}>
          {icon}
        </div>

        <div className={textContainerClass}>

          <h2 className={`${infoTitleClass} ${titleClass}`}>
            {title}
          </h2>

          <p className={valueClass}>
            {value}
          </p>

        </div>

      </div>

    </div>
  );
};

// ============================================================
// DATE FORMATTER
// ============================================================

const formatDate = (date) => {

  if (!date) {
    return "Not provided";
  }

  return new Date(date).toLocaleDateString();

};

export default ProfessionalDetails;