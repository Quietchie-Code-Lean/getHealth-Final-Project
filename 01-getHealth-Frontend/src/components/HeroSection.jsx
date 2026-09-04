import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import heroImage from "../assets/hero.png";

// ============================================================
// HERO SECTION COMPONENT
// ============================================================

const HeroSection = () => {

  /* Preset Tailwind Styles */

  const sectionClass = "relative flex min-h-[560px] items-center overflow-hidden bg-slate-900";
  const backgroundClass = "absolute inset-0 h-full w-full object-cover";
  const overlayClass = "absolute inset-0 bg-slate-950/65";
  const containerClass = "relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12";
  const contentClass = "max-w-2xl";
  const badgeClass = "mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-sm";
  const titleClass = "text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl";
  const subtitleClass = "mt-6 max-w-xl text-lg leading-8 text-slate-200";
  const buttonsContainerClass = "mt-8 flex flex-col gap-3 sm:flex-row";
  const primaryButtonClass = "rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500";
  const secondaryButtonClass = "rounded-lg border border-white/60 px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-slate-900";

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  const { user } = useAuth();

  const appointmentPath =
    user?.role === "PATIENT"
      ? "/appointments/new"
      : "/login";

  // ============================================================
  // HERO SECTION RENDER
  // ============================================================

  return (
    <section className={sectionClass}>

      <img
        src={heroImage}
        alt=""
        className={backgroundClass}/>

      <div className={overlayClass}></div>

      <div className={containerClass}>
        <div className={contentClass}>

          <span className={badgeClass}>
            Your healthcare, easier
          </span>

          <h1 className={titleClass}>
            Find the right healthcare professional for you
          </h1>

          <p className={subtitleClass}>
            Explore healthcare professionals, check their availability and
            book your appointment in just a few simple steps.
          </p>

          <div className={buttonsContainerClass}>

            <Link
              to={appointmentPath}
              className={primaryButtonClass}>
              Book Appointment
            </Link>

            <Link
              to="/professionals"
              className={secondaryButtonClass}>
              Find Professionals
            </Link>

          </div>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;
