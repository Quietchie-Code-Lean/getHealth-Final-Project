import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

// ============================================================
// LOGIN COMPONENT
// ============================================================

const Login = () => {

  /* Preset Tailwind Styles */

  const pageClass = "flex flex-1 items-center justify-center bg-slate-950 px-6 py-12";
  const cardClass = "w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-lg";
  const headerClass = "mb-8 text-center";
  const titleClass = "text-3xl font-bold tracking-tight text-slate-100";
  const subtitleClass = "mt-3 text-sm leading-6 text-slate-400";
  const formClass = "space-y-5";
  const labelClass = "mb-2 block text-sm font-medium text-slate-300";
  const inputClass = "w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";
  const errorClass = "rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300";
  const buttonClass = "w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60";
  const footerClass = "mt-6 text-center text-sm text-slate-400";
  const linkClass = "font-semibold text-violet-400 transition hover:text-violet-300";


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

  // Updates the corresponding form field when the user changes an input value.
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

        {/* Login header */}

        <div className={headerClass}>

          <h1 className={titleClass}>
            Welcome back
          </h1>

          <p className={subtitleClass}>
            Login to access your getHealth account and manage your appointments.
          </p>

        </div>

        {/* Login form */}

        <form onSubmit={handleSubmit} className={formClass}>

          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className={labelClass}>
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
              className={inputClass} />

          </div>

          {/* Password */}

          <div>

            <label
              htmlFor="password"
              className={labelClass}>
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
            className={buttonClass}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Registration link */}

        <p className={footerClass}>
          Don't have an account?{" "}
          <Link
            to="/register"
            className={linkClass}>
            Create an account
          </Link>
        </p>

      </section>

    </main>
  );
};

export default Login;
