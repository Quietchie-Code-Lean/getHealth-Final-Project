import { useAuth } from "../context/useAuth.js";

import PatientProfile from "./PatientProfile";
import ProfessionalProfile from "./ProfessionalProfile";

// ============================================================
// PROFILE COMPONENT
// ============================================================

// Selects the correct profile interface according to the authenticated user's role.
const Profile = () => {
  
  /* Preset Tailwind styles */
const loadingMainClass = "flex flex-1 items-center justify-center bg-slate-950";
const loadingTextClass = "text-sm text-slate-400";

  // Provides access to the authenticated user and loading state.
  const { user, authLoading } = useAuth();

  // ============================================================
  // AUTHENTICATION LOADING
  // ============================================================

  // Displays a loading state while the current session is restored.
  if (authLoading) {
    return (
      <main className={loadingMainClass}>
        <p className={loadingTextClass}>Loading profile...</p>
      </main>
    );
  }

  // ============================================================
  // USER VALIDATION
  // ============================================================

  // Prevents the profile from rendering when no user is authenticated.
  if (!user) {
    return null;
  }

  // ============================================================
  // ROLE-BASED PROFILE RENDER
  // ============================================================

  // Displays the patient profile interface.
  if (user.role === "PATIENT") {
    return <PatientProfile />;
  }

  // Displays the professional profile interface.
  if (user.role === "PROFESSIONAL") {
    return <ProfessionalProfile />;
  }

  return null;
};

export default Profile;
