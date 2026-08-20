import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import router from "./routes/specialty.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";


const app = express();

app.use(cors());
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/specialties", router);


// Global error handler
app.use(errorMiddleware);



export default app;
