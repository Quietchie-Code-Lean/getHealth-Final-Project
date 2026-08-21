import express from "express";
import cors from "cors";

import specialtyRouter from "./routes/specialty.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

// SPECIALTIES ROUTES
app.use("/api/specialties", specialtyRouter);

// APPOINTMENTS ROUTES
app.use("/api/appointments", appointmentRouter);

export default app;
