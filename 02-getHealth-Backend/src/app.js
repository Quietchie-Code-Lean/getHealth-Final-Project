import express from "express";
import cors from "cors";

import router from "./routes/specialty.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/specialties", router);

export default app;
