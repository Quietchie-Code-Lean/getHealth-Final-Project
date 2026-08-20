import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import router from "./routes/specialty.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/specialties", router);
app.use("/api/auth", authRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
