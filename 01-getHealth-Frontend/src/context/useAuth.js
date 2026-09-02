import { useContext } from "react";

import { AuthContext } from "./AuthContext.jsx";

// ============================================================
// USE AUTH HOOK
// ============================================================

// Provides a reusable hook for accessing the authentication context.
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
