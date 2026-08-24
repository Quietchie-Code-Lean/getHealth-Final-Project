import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerPatientRequest, registerProfessionalRequest, getProfileRequest } from "../services/Auth.services.js";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);


  // Restore session when application starts
  useEffect(() => {

    const restoreSession = async () => {

      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {

        const data = await getProfileRequest(token);

        setUser({
          ...data.user,
          profile: data.profile
        });

      } catch (error) {

        console.error("Session restoration failed:", error);

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);

      } finally {

        setAuthLoading(false);

      }
    };

    restoreSession();

  }, [token]);


  const login = async (credentials) => {

    const data = await loginRequest(credentials);

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
    
  };


  const registerPatient = async (patientData) => {

    return await registerPatientRequest(patientData);

  };


  const registerProfessional = async (professionalData) => {

    return await registerProfessionalRequest(professionalData);

  };


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };


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
    }}>
      {children}
    </AuthContext.Provider>
  );
};

//hook to avoid call and import traditionally
export const useAuth = () => {

  return useContext(AuthContext);

};