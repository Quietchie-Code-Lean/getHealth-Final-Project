// ============================================================
// FOOTER COMPONENT
// ============================================================

const Footer = () => {
  // ============================================================
  // TAILWIND STYLES
  // ============================================================

  // Define the main footer container styles.
  const footClass = "w-full bg-slate-800 text-white text-center py-4";

  // Defines the text styling used by footer elements.
  const textClass = "text-sm";

  // Defines the layout and spacing for the footer content.
  const footContClass = "flex flex-row justify-evenly";

  // ============================================================
  // FOOTER RENDER
  // ============================================================

  // Renders the footer with the application logo, navigation
  // links, and copyright information.
  return (
    <>
      <footer className={footClass}>
        <div className={footContClass}>
          <p className={textClass}> getHealth Logo </p>
          <p className={textClass}> About | Contact | Privacy | Terms </p>
          <p className={textClass}>© 2026 getHealth</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
