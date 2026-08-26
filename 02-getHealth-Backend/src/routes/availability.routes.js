import { Router } from "express";

import {
  getProfessionalAvailabilityController,
  createProfessionalAvailabilityController,
  updateAvailabilityController,
  //deleteAvailabilityController,
  //getProfessionalAvailableSlotsController,
} from "../controllers/availability.controllers.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { createAvailabilityMiddleware, updateAvailabilityMiddleware } from "../middlewares/validation.middleware.js";

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




/* 


// DELETE AVAILABILITY
router.delete(
  "/availability/:id",
  validateTokenMiddleware,
  deleteAvailabilityController
);


// GET AVAILABLE APPOINTMENT SLOTS
router.get(
  "/professionals/:id/available-slots",
  getProfessionalAvailableSlotsController

);
 */

export default router;