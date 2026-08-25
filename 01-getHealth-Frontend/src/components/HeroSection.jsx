import React from "react";

const HeroSection = () => {
  /* Preset Tailwind styles */
  const sectionClass =
    "relative min-h-[520px] flex items-center bg-cover bg-center bg-no-repeat";
  const overlayClass = "absolute inset-0 bg-slate-950/60";
  const containerClass =
    "relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:px-10 lg:px-16";
  const contentClass = "max-w-2xl";
  const titleClass = "text-5xl md:text-6xl font-bold tracking-tight text-white";
  const subtitleClass =
    "mt-6 text-lg md:text-xl leading-relaxed text-slate-200";
  const buttonsContainerClass = "mt-8 flex flex-col gap-4 sm:flex-row";
  const primaryBtnClass =
    "rounded-md bg-slate-800 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-slate-700";
  const secondaryBtnClass =
    "rounded-md border border-white px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-slate-800";

  // ============================================================
  // HERO SECTION RENDER
  // ============================================================

  // Renders the hero section with a background image, overlay,
  // descriptive content, and appointment-related actions.

  return (
    <section
      className={sectionClass}
      style={{ backgroundImage: "url('/images/hero-healthcare.jpg')" }}
    >
      {/* Background overlay */}
      <div className={overlayClass}></div>

      {/* Hero content */}
      <div className={containerClass}>
        <div className={contentClass}>
          <h1 className={titleClass}>getHealth</h1>

          <h2 className={subtitleClass}>
            Find healthcare professionals and book your appointment in just a
            few steps.
          </h2>

          <div className={buttonsContainerClass}>
            <button type="button" className={primaryBtnClass}>
              Book Appointment
            </button>

            <button type="button" className={secondaryBtnClass}>
              Find Professionals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
