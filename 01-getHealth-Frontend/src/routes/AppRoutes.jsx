import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
import Professionals from "../pages/Professionals.jsx";
import Appointments from "../pages/Appointments.jsx";
import NotFound from "../pages/NotFound.jsx";
import Specialities from "../pages/Specialities.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/specialities" element={<Specialities />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
