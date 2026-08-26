
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import specialtyRouter from "./routes/specialty.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import professionalRoutes from "./routes/professional.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

// ============================================================
// APPLICATION CONFIGURATION
// ============================================================

// Creates the Express application instance.
const app = express();

// ============================================================
// GLOBAL MIDDLEWARE
// ============================================================

// Enables Cross-Origin Resource Sharing for client requests.
app.use(cors());

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

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

// Handles errors passed through the application middleware chain.
app.use(errorMiddleware);

export default app;

