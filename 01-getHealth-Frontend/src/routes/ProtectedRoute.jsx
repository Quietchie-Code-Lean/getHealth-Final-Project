import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/useAuth.js";

// ============================================================
// PROTECTED ROUTE
// ============================================================

// Controls access to routes that require an authenticated user
// and optionally restricts access according to the user's role.

const ProtectedRoute = ({ allowedRoles }) => {
  // Provides access to the current authentication state.
  const { user, authLoading } = useAuth();

  // ============================================================
  // AUTHENTICATION LOADING
  // ============================================================

  // Prevents redirects while the current session is being restored.
  if (authLoading) {
    return <p>Loading...</p>;
  }

  // ============================================================
  // USER AUTHENTICATION
  // ============================================================

  // Redirects unauthenticated users to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ============================================================
  // ROLE AUTHORIZATION
  // ============================================================

  // Redirects authenticated users when their role is not allowed.
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ============================================================
  // PROTECTED CONTENT
  // ============================================================

  // Renders the protected child route.
  return <Outlet />;
};

export default ProtectedRoute;
