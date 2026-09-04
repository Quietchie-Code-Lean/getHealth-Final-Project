import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import SearchBar from "./SearchBar";

// ============================================================
// NAVBAR COMPONENT
// ============================================================

const Navbar = () => {

  /* Preset Tailwind Styles */
  const navClass = "sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-800 text-white shadow-sm";
  const wrapperClass = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
  const innerClass = "flex min-h-16 items-center justify-between gap-6";
  const logoClass = "text-xl font-bold tracking-tight text-white";
  const linksContainerClass = "flex items-center gap-2 text-sm";
  const linkBaseClass = "rounded-lg px-3 py-2 font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white";
  const appointmentLinkClass = "rounded-lg bg-blue-600 px-3 py-2 font-medium text-white transition hover:bg-blue-500";
  const registerLinkClass = "rounded-lg bg-white px-3 py-2 font-medium text-slate-800 transition hover:bg-slate-100";
  const logoutButtonClass = "rounded-lg px-3 py-2 font-medium text-slate-200 transition hover:bg-red-500/10 hover:text-red-300";

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  const { user, authLoading, logout } = useAuth();

  const navigate = useNavigate();

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  // ============================================================
  // NAVBAR RENDER
  // ============================================================

  // Renders the main navigation bar with the application logo, search bar, and navigation links.
  return (
    <>
      <nav className={navClass}>
        <div className={wrapperClass}>
          <div className={innerClass}>

            {/* Application logo */}

            <NavLink
              to="/"
              className={logoClass}>
              getHealth
            </NavLink>
            {/* Search bar */}

            <SearchBar />

            {/* Navigation links */}

            <div className={linksContainerClass}>

              <NavLink
                to="/"
                className={linkBaseClass}>
                Home
              </NavLink>

              <NavLink
                to="/professionals"
                className={linkBaseClass} >
                Professionals
              </NavLink>

              <NavLink
                to="/specialities"
                className={linkBaseClass}>
                Specialities
              </NavLink>

              {/* ============================================================
                AUTHENTICATED PATIENT LINKS
            ============================================================ */}

              {!authLoading && user?.role === "PATIENT" && (

                <NavLink
                  to="/appointments/new"
                  className={appointmentLinkClass}>
                  Book Appointment
                </NavLink>

              )}

              {/* ============================================================
                AUTHENTICATED USER LINKS
            ============================================================ */}

              {!authLoading && user && (
                <>
                  <NavLink
                    to="/profile"
                    className={linkBaseClass}>
                    Profile
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={logoutButtonClass}>
                    Logout
                  </button>
                </>
              )}

              {/* ============================================================
                  GUEST LINKS
                  ============================================================ */}

              {!authLoading && !user && (
                <>
                  <NavLink
                    to="/login"
                    className={linkBaseClass}>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={registerLinkClass}>
                    Register
                  </NavLink>
                </>
              )}

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
