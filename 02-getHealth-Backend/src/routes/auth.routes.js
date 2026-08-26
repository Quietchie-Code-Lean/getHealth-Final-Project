import { Router } from "express";
import {
  loginController,
  registerPatientController,
  registerProfessionalController,
  profileController,
} from "../controllers/auth.controller.js";
import {
  credentialsMiddleware,
  registerPatientMiddleware,
  registerProfessionalMiddleware,
} from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// ============================================================
// AUTH ROUTER
// ============================================================

// Defines the authentication routes and connects each endpoint
// with its corresponding middleware and controller.
const router = Router();

// ============================================================
// PATIENT REGISTRATION
// ============================================================

// Validates and processes patient registration requests.
router.post(
  "/register/patient",
  registerPatientMiddleware,
  registerPatientController,
);

// ============================================================
// PROFESSIONAL REGISTRATION
// ============================================================

// Validates and processes professional registration requests.
router.post(
  "/register/professional",
  registerProfessionalMiddleware,
  registerProfessionalController,
);

// ============================================================
// USER LOGIN
// ============================================================

// Validates the user's credentials and processes the login request.
router.post("/login", credentialsMiddleware, loginController);

// ============================================================
// USER PROFILE
// ============================================================

// Validates the authentication token before returning the authenticated user's profile information.
router.get("/profile", authMiddleware, profileController);

export default router;
