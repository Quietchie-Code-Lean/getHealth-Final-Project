import { Router } from "express";
import { loginController, registerPatientController, registerProfessionalController, profileController } from "../controllers/auth.controller.js";
import { credentialsMiddleware } from "../middlewares/auth.middleware.js";
import { validateTokenMiddleware } from "../middlewares/token.middleware.js";


const router = Router();


router.post(
    "/register/patient",
    credentialsMiddleware,
    registerPatientController
);


router.post(
    "/register/professional",
    credentialsMiddleware,
    registerProfessionalController
);


router.post(
    "/login",
    credentialsMiddleware,
    loginController
);


router.get(
    "/profile",
    validateTokenMiddleware,
    profileController
);


export default router;