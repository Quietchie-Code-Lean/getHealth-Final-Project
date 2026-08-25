import React from "react";

import HeroSection from "../components/HeroSection.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import ProfessionalsSection from "../components/ProfessionalsSection.jsx";
import SpecialitiesSection from "../components/SpecialitiesSection.jsx";

// ============================================================
// HOME COMPONENT
// ============================================================

const Home = () => {
  /* Preset Tailwind Styles */
  const pageClass = "bg-slate-100";

  // ============================================================
  // HOME PAGE RENDER
  // ============================================================

  // Renders the main home page by combining the hero section, workflow information, professionals, and specialities.
  return (
    <div className={pageClass}>
      {/* Displays the main hero section */}
      <HeroSection />

      {/* Explains how the getHealth platform works */}
      <HowItWorks />

      {/* Displays featured healthcare professionals */}
      <ProfessionalsSection />

      {/* Displays available healthcare specialities */}
      <SpecialitiesSection />
    </div>
  );
};

export default Home;
