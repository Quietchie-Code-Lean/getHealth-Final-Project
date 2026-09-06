// ============================================================
// FOOTER COMPONENT
// ============================================================

const Footer = () => {

  /* Preset Tailwind Styles */

  const footerClass = "w-full border-t border-slate-700 bg-slate-900 text-slate-300";
  const containerClass = "mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left";
  const brandClass = "font-bold text-slate-100";
  const descriptionClass = "mt-1 text-sm text-slate-400";
  const copyrightClass = "text-sm text-slate-500";

  // ============================================================
  // FOOTER RENDER
  // ============================================================

  // Renders the footer with the application logo, navigation
  // links, and copyright information.

  return (

      <footer className={footerClass}>

        <div className={containerClass}>

          <div>

            <p className={brandClass}>
              getHealth
            </p>

            <p className={descriptionClass}>
              Healthcare appointments made easier.
            </p>

          </div>

          <p className={copyrightClass}>© 2026 getHealth</p>

        </div>

      </footer>
      
  );
};

export default Footer;
