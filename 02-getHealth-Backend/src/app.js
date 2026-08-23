<<<<<<< HEAD
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import specialtyRouter from "./routes/specialty.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";

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

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

// Handles errors passed through the application middleware chain.
app.use(errorMiddleware);

export default app;
=======
import express from "express";
import cors from "cors";

import specialtyRouter from "./routes/specialty.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import professionalRoutes from "./routes/professional.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";


const app = express();

app.use(cors());
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/specialties", specialtyRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/professionals", professionalRoutes)


// Global error handler
app.use(errorMiddleware);



export default app;
>>>>>>> 21ffe6c (feat: configure professional API routes)
