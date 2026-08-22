import { Router } from "express";
import {
    loginController,
    registerPatientController,
    registerProfessionalController,
    profileController
} from "../controllers/auth.controller.js";
import {
    credentialsMiddleware,
    registerPatientMiddleware,
    registerProfessionalMiddleware
} from "../middlewares/auth.middleware.js";
import { validateTokenMiddleware } from "../middlewares/token.middleware.js";


const router = Router();


router.post(
    "/register/patient",
    registerPatientMiddleware,
    registerPatientController
);


router.post(
    "/register/professional",
    registerProfessionalMiddleware,
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
