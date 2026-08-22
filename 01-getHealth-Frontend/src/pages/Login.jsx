import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


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

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const data = await login(formData);
      console.log("Login response:", data);

      navigate("/profile");

    } catch (error) {
      console.error("Login error:", error);

      setError(error.response?.data?.message || "Unable to login. Please check your credentials.");

    } finally {
      setLoading(false);
    }

  };

  return (
    <main className={pageClass}>

      <section className={cardClass}>

        <div className={headerClass}>
          <h1 className={titleClass}>Login</h1>
          <p className={subtitleClass}>Access your getHealth account</p>
        </div>

        <form onSubmit={handleSubmit} className={formClass}>
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>

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

          <div>
            <label htmlFor="password" className={labelClass}>Password</label>

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

          {error && (<p className={errorClass}>{error}</p>)}

          <button
            type="submit"
            disabled={loading}
            className={buttonClass}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </section>

    </main>
  );
};

export default Login;
