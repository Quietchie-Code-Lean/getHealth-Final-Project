import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
/* import Professionals from "../pages/Professionals.jsx"; */
import Appointments from "../pages/Appointments.jsx";
import NotFound from "../pages/NotFound.jsx";
import Specialities from "../pages/Specialities.jsx";

// ============================================================
// APPLICATION ROUTES
// ============================================================

// Defines the application's public and protected page routes.

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* ============================================================
            PUBLIC ROUTES
        ============================================================ */}

        {/* Displays the home page. */}
        <Route path="/" element={<Home />} />

        {/* Displays the professionals page. */}
        {/* <Route path="/professionals" element={<Professionals />} /> */}

        {/* Displays the login page. */}
        <Route path="/login" element={<Login />} />

        {/* Displays the registration page. */}
        <Route path="/register" element={<Register />} />

        {/* Displays the complete specialties page. */}
        <Route path="/specialities" element={<Specialities />} />

        {/* ============================================================
            PROTECTED ROUTES
        ============================================================ */}

        {/* Allows authenticated patients and professionals to access their profile. */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "PROFESSIONAL"]} />
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Allows only authenticated patients to schedule appointments. */}
        <Route element={<ProtectedRoute allowedRoles={["PATIENT"]} />}>
          <Route path="/appointments/new" element={<Appointments />} />
        </Route>

        {/* ============================================================
            NOT FOUND
        ============================================================ */}

        {/* Catches any URL that does not match an existing route. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
