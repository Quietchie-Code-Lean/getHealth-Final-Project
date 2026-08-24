import { Router } from "express";

import {
  getSpecialtiesController,
  getSpecialtyByIdController,
  createSpecialtyController,
  updateSpecialtyController,
  updateSpecialtyStatusController,
} from "../controllers/specialty.controller.js";

const router = Router();

// Returns all specialties.
router.get("/", getSpecialtiesController);

// Returns a specialty by its unique ID.
router.get("/:id", getSpecialtyByIdController);

// Creates a new specialty.
router.post("/", createSpecialtyController);

// Updates an existing specialty.
router.put("/:id", updateSpecialtyController);

// Updates the active status of a specialty.
router.patch("/:id/status", updateSpecialtyStatusController);

export default router;
