import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  getSpecialtiesController,
  getSpecialtyByIdController,
  createSpecialtyController,
  updateSpecialtyController,
  updateSpecialtyStatusController,
} from "../controllers/specialty.controller.js";

const router = Router();

// ============================================================
// GET ALL SPECIALTIES
// ============================================================

// Returns all specialties.
router.get("/", getSpecialtiesController);

// ============================================================
// GET SPECIALTY BY ID
// ============================================================

// Returns a specialty by its unique ID.
router.get("/:id", getSpecialtyByIdController);

// ============================================================
// CREATE SPECIALTY
// ============================================================

// Creates a new specialty. Only administrators are authorized.
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  createSpecialtyController,
);

// ============================================================
// UPDATE SPECIALTY
// ============================================================

// Updates an existing specialty. Only administrators are authorized.
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateSpecialtyController,
);

// ============================================================
// UPDATE SPECIALTY STATUS
// ============================================================

// Updates the active status of a specialty. Only administrators are authorized.
router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateSpecialtyStatusController,
);
export default router;
