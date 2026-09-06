

// ============================================================
// PROFILE FIELD COMPONENT
// ============================================================

// Displays a reusable profile information field.
const ProfileField = ({ label, value }) => {

  /* Preset Tailwind styles */

  const labelClass = "text-sm font-medium text-slate-400";
  const valueClass = "mt-1 font-medium text-slate-100";

  return (

    <div>

      <p className={labelClass}>{label}</p>
      <p className={valueClass}>{value || "Not provided"}</p>

    </div>
  );
};

export default ProfileField;