import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Register = () => {

  const navigate = useNavigate();

  const { registerPatient, registerProfessional } = useAuth();


  const [activeTab, setActiveTab] = useState("patient");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",

    // Professional-specific fields
    specialityId: "",
    licenseNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      specialityId: "",
      licenseNumber: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (activeTab === "patient") {
        const patientData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        };

        const data = await registerPatient(patientData);

        console.log("Patient registered:", data);
      }

      if (activeTab === "professional") {
        const professionalData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          specialityId: formData.specialityId,
          licenseNumber: formData.licenseNumber,
        };

        const data = await registerProfessional(professionalData);

        console.log("Professional registered:", data);
      }

      navigate("/login");

    } catch (error) {
      console.error("Register error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to register. Please check your information."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Register as a patient or healthcare professional.
          </p>
        </div>

        {/* REGISTER TYPE TABS */}
        <div className="mb-8 grid grid-cols-2 rounded-xl bg-gray-100 p-1">

          <button
            type="button"
            onClick={() => handleTabChange("patient")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === "patient"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"}`}>Patient</button>

          <button
            type="button"
            onClick={() => handleTabChange("professional")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === "professional"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"}`}>Professional</button>

        </div>

        {/* REGISTER FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* FIRST NAME */}
          <div>

            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium text-gray-700">First name</label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              autoComplete="given-name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"/>

          </div>

          {/* LAST NAME */}
          <div>

            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium text-gray-700">Last name</label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              autoComplete="family-name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"/>

          </div>

          {/* PASSWORD */}
          <div>

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >Password</label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"/>

          </div>

          {/* PROFESSIONAL ONLY */}
          {activeTab === "professional" && (
            <>
              <div>
                <label
                  htmlFor="specialityId"
                  className="mb-2 block text-sm font-medium text-gray-700">Speciality</label>

                <select
                  id="specialityId"
                  name="specialityId"
                  value={formData.specialityId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500">

                  <option value="">Select a speciality</option>
                  <option value="1">General Medicine</option>
                  <option value="2">Cardiology</option>
                  <option value="3">Dermatology</option>
                  <option value="4">Pediatrics</option>
                </select>

              </div>

              <div>
                <label
                  htmlFor="licenseNumber"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Professional license number
                </label>

                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Enter your license number"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : activeTab === "patient"
                ? "Register as Patient"
                : "Register as Professional"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;