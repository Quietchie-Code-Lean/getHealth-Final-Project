import React from "react";
import CardGen from "./CardGen.jsx";

// ============================================================
// PROFESSIONALS SECTION COMPONENT
// ============================================================

const ProfessionalsSection = () => {
  /* Preset Tailwind Styles */
  const btnProfClass = "rounded-lg bg-blue-600 px-4 py-2 text-white";
  const cardsContainer = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  // ============================================================
  // PROFESSIONALS SECTION RENDER
  // ============================================================

  // Renders the professionals section with specialty cards and an option to view all available professionals.
  return (
    <div>
      {/* Displays the section title and introductory message */}
      <h1>Meet our Professionals:</h1>
      <br />
      <h3>Find the care you need</h3>
      <br />

      {/* Displays the featured healthcare specialties */}
      <div className={cardsContainer}>
        <CardGen
          title="Cardiology"
          icon=""
          description="Search by speciality and find the right healthcare professional for you"
        />

        <CardGen
          title="Dermatology"
          icon=""
          description="Check the professional’s availability and select the date and time that works best for you."
        />

        <CardGen
          title="Traumatology"
          icon=""
          description="Review the details and confirm your booking. Your appointment is ready!"
        />
      </div>

      {/* Provides access to the complete professionals list */}
      <button className={btnProfClass}>View all professionals</button>
    </div>
  );
};

export default ProfessionalsSection;
