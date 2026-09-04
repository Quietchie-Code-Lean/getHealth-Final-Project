import CardGen from "./CardGen.jsx";

// ============================================================
// HOW IT WORKS COMPONENT
// ============================================================

const HowItWorks = () => {

  /* Preset Tailwind Styles */

  const sectionClass = "bg-white py-16 sm:py-20";
  const containerClass = "mx-auto max-w-7xl px-6 sm:px-8 lg:px-12";
  const headerClass = "mx-auto mb-10 max-w-2xl text-center";
  const eyebrowClass = "text-sm font-semibold uppercase tracking-wider text-blue-600";
  const titleClass = "mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl";
  const descriptionClass = "mt-4 text-base leading-7 text-slate-600";
  const cardsContainerClass = "grid grid-cols-1 gap-6 md:grid-cols-3";
  const stepClass = "flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700";

  return (
    <section className={sectionClass}>

      <div className={containerClass}>

        <div className={headerClass}>

          <p className={eyebrowClass}>
            Simple and convenient
          </p>

          <h2 className={titleClass}>
            How getHealth works
          </h2>

          <p className={descriptionClass}>
            Book your healthcare appointment in three simple steps.
          </p>

        </div>

        <div className={cardsContainerClass}>

          <CardGen
            icon={<span className={stepClass}>1</span>}
            title="Find a Professional"
            description="Explore healthcare professionals and choose the one that best matches your needs." />

          <CardGen
            icon={<span className={stepClass}>2</span>}
            title="Choose an Available Time"
            description="Check the professional's availability and select the date and time that works best for you." />

          <CardGen
            icon={<span className={stepClass}>3</span>}
            title="Confirm Your Appointment"
            description="Confirm your booking and receive your appointment information by email." />

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;