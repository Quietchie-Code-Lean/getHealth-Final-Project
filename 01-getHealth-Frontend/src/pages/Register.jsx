import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getSpecialities } from "../services/Speciality.services.js";


// ============================================================
// REGISTER COMPONENT
// ============================================================

const Register = () => {
  /* Preset Tailwind Styles */
  const pageClass = "flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-100 px-6 py-10";
  const cardClass = "w-full max-w-lg rounded-md bg-white p-8";
  const headerClass = "mb-6";
  const titleClass = "text-3xl font-semibold text-slate-800";
  const subtitleClass = "mt-2 text-sm text-slate-600";
  const tabsClass = "mb-8 grid grid-cols-2 rounded-md bg-slate-100 p-1";
  const tabBaseClass = "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200";
  const tabActiveClass = `${tabBaseClass} bg-slate-800 text-white`;
  const tabInactiveClass = `${tabBaseClass} text-slate-600 hover:text-slate-800`;
  const formClass = "space-y-5";
  const labelClass = "mb-2 block text-sm font-medium text-slate-800";
  const inputClass = "w-full rounded-md border border-slate-300 px-4 py-3 text-slate-800 outline-none transition-colors duration-200 focus:border-slate-800";
  const errorClass = "text-sm text-red-600";
  const buttonClass = "w-full rounded-md bg-slate-800 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60";

  // ============================================================
  // NAVIGATION AND AUTHENTICATION
  // ============================================================

  // Provides navigation functionality after successful registration.
  const navigate = useNavigate();

  // Provides access to the patient and professional registration methods.
  const { registerPatient, registerProfessional } = useAuth();




  // ============================================================
  // FORM STATE
  // ============================================================

  // Stores the selected registration type.
  const [activeTab, setActiveTab] = useState("patient");

  // Stores the common registration fields and professional-specific data.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",

    // Shared profile fields 
    dateOfBirth: "",
    identificationNumber: "",

    // Patient-specific fields
    phone: "",

    // Professional-specific fields
    specialityId: "",
    licenseNumber: "",
  });

  // Stores the current registration error message.
  const [error, setError] = useState("");

  // Tracks the registration request state.
  const [loading, setLoading] = useState(false);

  // ============================================================ 
  // SPECIALITIES STATE 
  // ============================================================ 


  // Stores the specialties retrieved from the backend API.
  const [specialities, setSpecialities] = useState([]);

  // Loads the available specialties when the registration page is mounted.
  useEffect(() => {
    const loadSpecialities = async () => {
      try {

        const data = await getSpecialities();
        setSpecialities(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error("Error loading specialities:", error);
      }
    };

    loadSpecialities();
  }, []);


  // ============================================================
  // REGISTRATION TYPE HANDLING
  // ============================================================

  // Changes the registration type, clears previous errors,
  // and resets the form data for the selected account type.
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      identificationNumber: "",
      dateOfBirth: "",
      specialityId: "",
      licenseNumber: "",
    });
  };

  // ============================================================
  // FORM INPUT HANDLING
  // ============================================================

  // Updates the corresponding form field when the user changes
  // an input value.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ============================================================
  // REGISTRATION SUBMISSION
  // ============================================================

  // Submits the registration data according to the selected account type and redirects the user to the login page.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Registers a new patient using the common account fields.
      if (activeTab === "patient") {
        const patientData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          identificationNumber: formData.identificationNumber,
        };

        const data = await registerPatient(patientData);

        console.log("Patient registered:", data);
      }

      // Registers a new professional using the common and professional-specific account fields.
      if (activeTab === "professional") {
        const professionalData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          identificationNumber: formData.identificationNumber,
          specialityId: Number(formData.specialityId),
          licenseNumber: formData.licenseNumber,
        };

        const data = await registerProfessional(professionalData);

        console.log("Professional registered:", data);
      }

      // Redirects the user to the login page after registration.
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);

      // Displays the server error message or a default registration error.
      setError(
        error.response?.data?.message ||
        "Unable to register. Please check your information.",
      );
    } finally {
      // Resets the loading state after the registration request completes.
      setLoading(false);
    }
  };

  // ============================================================
  // REGISTRATION FORM RENDER
  // ============================================================

  // Renders the registration form with account type selection, common account fields, and professional-specific fields.
  return (
    <main className={pageClass}>
      <section className={cardClass}>
        {/* Displays the registration title and account type description */}
        <div className={headerClass}>
          <h1 className={titleClass}>Create your account</h1>

          <p className={subtitleClass}>
            Register as a patient or healthcare professional.
          </p>
        </div>

        {/* Allows the user to select the account type */}
        <div className={tabsClass}>
          <button
            type="button"
            onClick={() => handleTabChange("patient")}
            className={
              activeTab === "patient" ? tabActiveClass : tabInactiveClass
            }
          >
            Patient
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("professional")}
            className={
              activeTab === "professional" ? tabActiveClass : tabInactiveClass
            }
          >
            Professional
          </button>
        </div>

        {/* Handles the submission of the registration data */}
        <form onSubmit={handleSubmit} className={formClass}>
          {/* Patient and professional first name field */}
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First name
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              autoComplete="given-name"
              required
              className={inputClass}
            />
          </div>

          {/* Patient and professional last name field */}
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last name
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              autoComplete="family-name"
              required
              className={inputClass}
            />
          </div>

          {/* Account email field */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          {/* Account password field */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className={inputClass}
            />
          </div>

          {/* Patient and professional date of birth field */}
          <div>
            <label htmlFor="dateOfBirth" className={labelClass}>
              Date of birth
            </label>

            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className={inputClass}
            />

          </div>

          {/* Patient and professional identification number field */}
          <div>
            <label htmlFor="identificationNumber" className={labelClass}>
              Identification number
            </label>

            <input
              id="identificationNumber"
              name="identificationNumber"
              type="text"
              value={formData.identificationNumber}
              onChange={handleChange}
              placeholder="Enter your identification number"
              required
              className={inputClass}
            />

          </div>

          {/* Displays the patient-specific registration fields */}
          {activeTab === "patient" && (

            <div>

              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
                className={inputClass}
              />

            </div>

          )}

          {/* Displays additional fields required for professional registration */}
          {activeTab === "professional" && (
            <>
              {/* Professional speciality selection */}
              <div>
                <label htmlFor="specialityId" className={labelClass}>
                  Speciality
                </label>

                <select
                  id="specialityId"
                  name="specialityId"
                  value={formData.specialityId}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select a speciality</option>

                  {specialities.map((speciality) => (

                    <option key={speciality.id} value={speciality.id}>
                      {speciality.name}
                    </option>

                  ))}
                </select>
              </div>

              {/* Professional license number field */}
              <div>
                <label htmlFor="licenseNumber" className={labelClass}>
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
                  className={inputClass}
                />
              </div>
            </>
          )}

          {/* Displays the registration error when the request fails */}
          {error && <p className={errorClass}>{error}</p>}

          {/* Submits the registration form and displays the current loading state */}
          <button type="submit" disabled={loading} className={buttonClass}>
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
