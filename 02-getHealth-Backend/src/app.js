import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import specialtyRouter from "./routes/specialty.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";


const app = express();

app.use(cors());
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/specialties", specialtyRouter);
app.use("/api/appointments", appointmentRouter);


// Global error handler
app.use(errorMiddleware);



export default app;
