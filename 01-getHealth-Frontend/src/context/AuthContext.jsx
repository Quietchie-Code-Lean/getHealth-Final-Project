import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerPatientRequest,
  registerProfessionalRequest,
  getProfileRequest,
} from "../services/Auth.services.js";

// ============================================================
// AUTH CONTEXT
// ============================================================

const AuthContext = createContext();

// ============================================================
// AUTH PROVIDER
// ============================================================

export const AuthProvider = ({ children }) => {
  // Stores the authentication token and restores it from localStorage when the application starts.
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Stores the authenticated user's information.
  const [user, setUser] = useState(null);

  // Tracks the authentication state while the session is being restored.
  const [authLoading, setAuthLoading] = useState(true);

  // ============================================================
  // SESSION RESTORATION
  // ============================================================

  // Restores the authenticated user's session when the application starts or when the authentication token changes.
  useEffect(() => {
    const restoreSession = async () => {
      // Clears the authentication state when no token is available.
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        // Retrieves the authenticated user's profile using the stored token.
        const data = await getProfileRequest(token);

        // Stores the user data together with the associated profile.
        setUser({
          ...data.user,
          profile: data.profile,
        });
      } catch (error) {
        // Clears the stored session when the token is no longer valid.
        console.error("Session restoration failed:", error);

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
      } finally {
        // Marks the session restoration process as completed.
        setAuthLoading(false);
      }
    };
    restoreSession();
  }, [token]);

  // ============================================================
  // LOGIN
  // ============================================================

  // Authenticates the user, stores the returned token, and updates the current authenticated user.
  const login = async (credentials) => {
    const data = await loginRequest(credentials);

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // ============================================================
  // PATIENT REGISTRATION
  // ============================================================

  // Sends the patient registration data to the authentication service.
  const registerPatient = async (patientData) => {
    return await registerPatientRequest(patientData);
  };

  // ============================================================
  // PROFESSIONAL REGISTRATION
  // ============================================================

  // Sends the professional registration data to the authentication service.
  const registerProfessional = async (professionalData) => {
    return await registerProfessionalRequest(professionalData);
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  // Removes the stored authentication token and clears the current authenticated user.
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // ============================================================
  // AUTH CONTEXT PROVIDER
  // ============================================================

  // Exposes authentication state and actions to components throughout the application.
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authLoading,
        login,
        logout,
        registerPatient,
        registerProfessional,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ============================================================
// USE AUTH HOOK
// ============================================================

// Provides a reusable hook for accessing the authentication context.
export const useAuth = () => {
  return useContext(AuthContext);
};
