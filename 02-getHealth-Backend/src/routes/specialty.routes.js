import { Router } from "express";

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

// Creates a new specialty.
router.post("/", createSpecialtyController);

// ============================================================
// UPDATE SPECIALTY
// ============================================================

// Updates an existing specialty.
router.put("/:id", updateSpecialtyController);

// ============================================================
// UPDATE SPECIALTY STATUS
// ============================================================

// Updates the active status of a specialty.
router.patch("/:id/status", updateSpecialtyStatusController);

export default router;
