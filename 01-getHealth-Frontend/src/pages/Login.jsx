import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// ============================================================
// LOGIN COMPONENT
// ============================================================

const Login = () => {
  /* Preset Tailwind Styles */
  const pageClass = "flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-100 px-6";
  const cardClass = "w-full max-w-md rounded-md bg-white p-8";
  const headerClass = "mb-6";
  const titleClass = "text-3xl font-semibold text-slate-800";
  const subtitleClass = "mt-2 text-sm text-slate-600";
  const formClass = "space-y-5";
  const labelClass = "mb-2 block text-sm font-medium text-slate-800";
  const inputClass = "w-full rounded-md border border-slate-300 px-4 py-3 text-slate-800 outline-none transition-colors duration-200 focus:border-slate-800";
  const errorClass = "text-sm text-red-600";
  const buttonClass = "w-full rounded-md bg-slate-800 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60";

  // ============================================================
  // NAVIGATION AND AUTHENTICATION
  // ============================================================

  // Provides navigation functionality after a successful login.
  const navigate = useNavigate();

  // Provides access to the authentication login function.
  const { login } = useAuth();

  // ============================================================
  // FORM STATE
  // ============================================================

  // Stores the email and password entered by the user.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Stores the current login error message.
  const [error, setError] = useState("");

  // Tracks the login request state to prevent duplicate submissions.
  const [loading, setLoading] = useState(false);

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
  // LOGIN SUBMISSION
  // ============================================================

  // Submits the login credentials, handles the authentication
  // response, and redirects the user to their profile.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Authenticates the user with the submitted credentials.
      const data = await login(formData);
      console.log("Login response:", data);

      // Redirects the authenticated user to their profile.
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      // Displays the server error message or a default login error.
      setError(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials.",
      );
    } finally {
      // Resets the loading state after the login request completes.
      setLoading(false);
    }
  };

  // ============================================================
  // LOGIN FORM RENDER
  // ============================================================

  // Renders the login form with email and password fields,
  // validation feedback, and the login action.
  return (
    <main className={pageClass}>
      <section className={cardClass}>
        {/* Displays the login title and account access message */}
        <div className={headerClass}>
          <h1 className={titleClass}>Login</h1>
          <p className={subtitleClass}>Access your getHealth account</p>
        </div>

        {/* Handles the submission of the login credentials */}
        <form onSubmit={handleSubmit} className={formClass}>
          {/* Email input field */}
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

          {/* Password input field */}
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
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </div>

          {/* Displays the login error when authentication fails */}
          {error && <p className={errorClass}>{error}</p>}

          {/* Submits the login form and displays the current loading state */}
          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
