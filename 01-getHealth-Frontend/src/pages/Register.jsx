import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth.js";
import { getSpecialities } from "../services/Speciality.services.js";

// ============================================================
// REGISTER COMPONENT
// ============================================================

const Register = () => {

  /* Preset Tailwind Styles */

  const pageClass = "flex flex-1 items-center justify-center bg-slate-950 px-6 py-12";
  const cardClass = "w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-lg";
  const headerClass = "mb-8 text-center";
  const titleClass = "text-3xl font-bold tracking-tight text-slate-100";
  const subtitleClass = "mt-3 text-sm leading-6 text-slate-400";
  const tabsClass = "mb-8 grid grid-cols-2 rounded-lg border border-slate-700 bg-slate-800 p-1";
  const tabBaseClass = "rounded-md px-4 py-2.5 text-sm font-semibold transition";
  const tabActiveClass = `${tabBaseClass} bg-violet-600 text-white shadow-sm`;
  const tabInactiveClass = `${tabBaseClass} text-slate-400 hover:bg-slate-700 hover:text-slate-100`;
  const formClass = "space-y-5";
  const fieldsRowClass = "grid grid-cols-1 gap-5 md:grid-cols-2";
  const labelClass = "mb-2 block text-sm font-medium text-slate-300";
  const inputClass = "w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";
  const errorClass = "rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300";
  const buttonClass = "w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60";
  const footerClass = "mt-6 text-center text-sm text-slate-400";
  const linkClass = "font-semibold text-violet-400 transition hover:text-violet-300";

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

  return (
    <main className={pageClass}>

      <section className={cardClass}>

        {/* Registration header */}

        <div className={headerClass}>

          <h1 className={titleClass}>
            Create your account
          </h1>

          <p className={subtitleClass}>
            Join getHealth as a patient or healthcare professional.
          </p>

        </div>

        {/* Account type */}

        <div className={tabsClass}>

          <button
            type="button"
            onClick={() => handleTabChange("patient")}
            className={
              activeTab === "patient"
                ? tabActiveClass
                : tabInactiveClass
            }
          >
            Patient
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("professional")}
            className={
              activeTab === "professional"
                ? tabActiveClass
                : tabInactiveClass
            }
          >
            Professional
          </button>

        </div>

        {/* Registration form */}

        <form onSubmit={handleSubmit} className={formClass}>

          {/* Name fields */}

          <div className={fieldsRowClass}>

            <div>

              <label
                htmlFor="firstName"
                className={labelClass}
              >
                First name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                autoComplete="given-name"
                required
                className={inputClass}
              />

            </div>

            <div>

              <label
                htmlFor="lastName"
                className={labelClass}
              >
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                autoComplete="family-name"
                required
                className={inputClass}
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className={labelClass}
            >
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

          {/* Password */}

          <div>

            <label
              htmlFor="password"
              className={labelClass}
            >
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

          {/* Date and identification */}

          <div className={fieldsRowClass}>

            <div>

              <label
                htmlFor="dateOfBirth"
                className={labelClass}
              >
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

            <div>

              <label
                htmlFor="identificationNumber"
                className={labelClass}
              >
                Identification number
              </label>

              <input
                id="identificationNumber"
                name="identificationNumber"
                type="text"
                value={formData.identificationNumber}
                onChange={handleChange}
                placeholder="Identification number"
                required
                className={inputClass}
              />

            </div>

          </div>

          {/* Patient fields */}

          {activeTab === "patient" && (

            <div>

              <label
                htmlFor="phone"
                className={labelClass}
              >
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

          {/* Professional fields */}

          {activeTab === "professional" && (

            <div className={fieldsRowClass}>

              <div>

                <label
                  htmlFor="specialityId"
                  className={labelClass}
                >
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

                  <option value="">
                    Select a speciality
                  </option>

                  {specialities.map((speciality) => (
                    <option
                      key={speciality.id}
                      value={speciality.id}
                    >
                      {speciality.name}
                    </option>
                  ))}

                </select>

              </div>


              <div>

                <label
                  htmlFor="licenseNumber"
                  className={labelClass}
                >
                  Professional license
                </label>

                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="License number"
                  required
                  className={inputClass}
                />

              </div>

            </div>

          )}

          {/* Error */}

          {error && (
            <p className={errorClass}>
              {error}
            </p>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className={buttonClass}
          >
            {loading
              ? "Creating account..."
              : activeTab === "patient"
                ? "Create Patient Account"
                : "Create Professional Account"}
          </button>

        </form>

        {/* Login link */}

        <p className={footerClass}>
          Already have an account?{" "}
          <Link
            to="/login"
            className={linkClass}
          >
            Login
          </Link>
        </p>

      </section>

    </main>
  );
};

export default Register;
