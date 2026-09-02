import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProfessionalByIdRequest } from "../services/Professional.services.js";

// ============================================================
// PROFESSIONAL DETAILS COMPONENT
// ============================================================
// Displays the complete public profile of a selected professional.

const ProfessionalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [professional, setProfessional] = useState(null);
  const [error, setError] = useState(false);

  // ============================================================
  // LOAD PROFESSIONAL
  // ============================================================
  // Retrieves the selected professional from the API.

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
  // FORMAT DATE
  // ============================================================
  // Converts stored dates into a readable local date format.

  const formatDate = (date) => {
    if (!date) {
      return "Not provided";
    }

    return new Date(date).toLocaleDateString();
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (!professional && !error) {
    return (
      <main className="min-h-[calc(100vh-120px)] bg-slate-50 px-4 py-4">
        <section className="mx-auto max-w-6xl">
          <p className="text-sm text-slate-600">
            Loading professional profile...
          </p>
        </section>
      </main>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error) {
    return (
      <main className="min-h-[calc(100vh-120px)] bg-slate-50 px-4 py-4">
        <section className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/professionals")}
            className="mb-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            ← Back to professionals
          </button>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              Professional profile
            </h1>

            <p className="mt-2 text-sm text-slate-600">
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
    professional.specialties?.map((specialty) => specialty.name).join(", ") ||
    "No specialties available";

  // ============================================================
  // PROFESSIONAL PROFILE RENDER
  // ============================================================

  return (
    <main className="min-h-[calc(100vh-120px)] bg-slate-50 px-4 py-3">
      <section className="mx-auto max-w-6xl">
        {/* ============================================================
            BACK NAVIGATION
            ============================================================ */}

        <button
          type="button"
          onClick={() => navigate("/professionals")}
          className="mb-3 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          ← Back to professionals
        </button>

        {/* ============================================================
            PROFILE CONTAINER
            ============================================================ */}

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* ============================================================
              PROFILE HEADER
              ============================================================ */}

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-5">
            <div className="flex items-center gap-6">
              {/* Professional avatar */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-white text-3xl shadow-sm"></div>

              {/* Professional identity */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-blue-600">
                  Healthcare Professional
                </p>

                <h1 className="!text-2xl !font-bold !tracking-tight !text-slate-900">
                  {fullName}
                </h1>

                <p className="mt-1 text-sm text-slate-600">
                  Professional profile
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================
              PROFILE INFORMATION
              ============================================================ */}

          <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2">
            {/* Name */}
            <ProfileInfo
              title="Name"
              value={fullName}
              icon="👤"
              className="border-blue-100 bg-blue-50"
              titleClass="text-blue-700"
            />

            {/* Specialties */}
            <ProfileInfo
              title="Specialties"
              value={specialties}
              icon="🩺"
              className="border-emerald-100 bg-emerald-50"
              titleClass="text-emerald-700"
            />

            {/* License Number */}
            <ProfileInfo
              title="License Number"
              value={professional.license_number || "Not provided"}
              icon="📋"
              className="border-violet-100 bg-violet-50"
              titleClass="text-violet-700"
            />

            {/* Biography */}
            <ProfileInfo
              title="Biography"
              value={professional.biography || "No biography available"}
              icon="📝"
              className="border-amber-100 bg-amber-50"
              titleClass="text-amber-700"
            />

            {/* Date of Birth */}
            <ProfileInfo
              title="Date of Birth"
              value={formatDate(professional.date_of_birth)}
              icon="📅"
              className="border-pink-100 bg-pink-50"
              titleClass="text-pink-700"
            />

            {/* Identification Number */}
            <ProfileInfo
              title="Identification Number"
              value={professional.identification_number || "Not provided"}
              icon="🪪"
              className="border-indigo-100 bg-indigo-50"
              titleClass="text-indigo-700"
            />

            {/* Approval Status */}
            <ProfileInfo
              title="Approval Status"
              value={professional.approval_status || "Not provided"}
              icon="✓"
              className="border-green-100 bg-green-50"
              titleClass="text-green-700"
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
// Displays a single professional profile field.

const ProfileInfo = ({ title, value, icon, className, titleClass }) => {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${className}`}>
      <div className="flex items-center gap-3">
        {/* Field icon */}
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-sm">
          {icon}
        </div>

        {/* Field information */}
        <div className="min-w-0">
          <h2 className={`text-xs font-bold ${titleClass}`}>{title}:</h2>

          <p className="mt-0.5 break-words text-sm font-medium leading-snug text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
