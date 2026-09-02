import axios from "axios";

// ============================================================
// AUTHENTICATED AXIOS INSTANCE
// ============================================================

// Creates a reusable Axios instance for authenticated API requests.
const authAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// ============================================================
// JWT REQUEST INTERCEPTOR
// ============================================================

// Adds the stored JWT to authenticated requests before they are sent.
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Adds the bearer token when an authenticated session exists.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default authAxios;
