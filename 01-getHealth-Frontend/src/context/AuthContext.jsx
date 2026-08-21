import { createContext, useContext, useState } from "react";
import { loginRequest, registerPatientRequest, registerProfessionalRequest } from "../services/Auth.services";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);


  const login = async (credentials) => {

    const data = await loginRequest(credentials);

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);

    return data;
  };


  const registerPatient = async (patientData) => {

    const data = await registerPatientRequest(patientData);

    return data;
  };


  const registerProfessional = async (professionalData) => {

    const data = await registerProfessionalRequest(professionalData);
    
    return data;

  };


  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };


  return (
        <AuthContext.Provider value={{  token,
                                        user,
                                        login,
                                        logout,
                                        registerPatient,
                                        registerProfessional,}}>
                                        {children}
        </AuthContext.Provider>
    );
};

//hook to avoid call and import traditionally
export const useAuth = () => {

  return useContext(AuthContext);

};