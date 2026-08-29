

// ============================================================
// PROFILE FIELD COMPONENT
// ============================================================

// Displays a reusable profile information field.
const ProfileField = ({ label, value }) => {

  /* Preset Tailwind styles */
  const labelClass = "text-sm font-medium text-gray-500";
  const valueClass = "mt-1 font-medium text-gray-900";

  return (
    
    <div>

        <p className={labelClass}>{label}</p>
        <p className={valueClass}>{value || "Not provided"}</p>

    </div>
  );
};

export default ProfileField;