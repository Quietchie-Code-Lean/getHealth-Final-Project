
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import specialtyRouter from "./routes/specialty.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import professionalRoutes from "./routes/professional.routes.js";
import availabilityRoutes from "./routes/availability.routes.js"

import { errorMiddleware } from "./middlewares/error.middleware.js";

// ============================================================
// APPLICATION CONFIGURATION
// ============================================================

// Creates the Express application instance.
const app = express();

// ============================================================
// GLOBAL MIDDLEWARE
// ============================================================


// Defines the frontend origins allowed to communicate with the API.
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

// Enables Cross-Origin Resource Sharing for approved frontend origins.
app.use(
    cors({
        origin: allowedOrigins,
    })
);

// Parses incoming requests with JSON payloads.
app.use(express.json());

// ============================================================
// API ROUTES
// ============================================================

// Registers the authentication routes under the /api/auth path.
app.use("/api/auth", authRoutes);

// Registers the speciality routes under the /api/specialties path.
app.use("/api/specialties", specialtyRouter);

// Registers the appointment routes under the /api/appointments path.
app.use("/api/appointments", appointmentRouter);

// Registers the professional routes under the /api/professionals path.
app.use("/api/professionals", professionalRoutes);

// Registers the availability routes under the /api path.
app.use("/api", availabilityRoutes);

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

// Handles errors passed through the application middleware chain.
app.use(errorMiddleware);

export default app;

