import { Router } from "express";

import {
  getProfessionalAvailabilityController,
  createProfessionalAvailabilityController,
  updateAvailabilityController,
  deleteAvailabilityController,
  getProfessionalAvailableSlotsController,
} from "../controllers/availability.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { createAvailabilityMiddleware, updateAvailabilityMiddleware, availableSlotsMiddleware, } from "../middlewares/validation.middleware.js";

// ============================================================
// ROUTER CONFIGURATION
// ============================================================

const router = Router();

// ============================================================
// AVAILABILITY ROUTES
// ============================================================

// Gets the availability schedule of a professional.
router.get(
  "/professionals/:id/availability",
  getProfessionalAvailabilityController
);

// Creates a new availability schedule for a professional.
router.post(
  "/professionals/:id/availability",
  authMiddleware,
  authorizeRoles("PROFESSIONAL", "ADMIN"),
  createAvailabilityMiddleware,
  createProfessionalAvailabilityController
);

// Updates an existing professional availability schedule.
router.put(
  "/availability/:id",
  authMiddleware,
  authorizeRoles("PROFESSIONAL", "ADMIN"),
  updateAvailabilityMiddleware,
  updateAvailabilityController
);

// Deletes an existing professional availability schedule.
router.delete(
  "/availability/:id",
  authMiddleware,
  authorizeRoles("PROFESSIONAL", "ADMIN"),
  deleteAvailabilityController
);

router.get(
  "/professionals/:id/available-slots",
  availableSlotsMiddleware,
  getProfessionalAvailableSlotsController
);


export default router;