import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  getProfessionalsController,
  getProfessionalByIdController,
  updateProfessionalController,
  updateProfessionalStatusController,
  addProfessionalSpecialityController,
  removeProfessionalSpecialityController,
} from "../controllers/professional.controller.js";

const router = Router();


// ============================================================
// GET ALL PROFESSIONALS
// ============================================================

// Public endpoint.
// Returns professionals and accepts optional filters.
router.get("/",
  getProfessionalsController,
);


// ============================================================
// GET PROFESSIONAL BY ID
// ============================================================

// Public endpoint.
// Returns one professional by ProfessionalProfile.id.
router.get("/:id",
  getProfessionalByIdController,
);


// ============================================================
// UPDATE PROFESSIONAL PROFILE
// ============================================================

// Professionals may update their own profile.
// Administrators may update any professional profile.
router.patch("/:id",
  authMiddleware,
  authorizeRoles("PROFESSIONAL", "ADMIN"),
  updateProfessionalController,
);


// ============================================================
// UPDATE PROFESSIONAL APPROVAL STATUS
// ============================================================

// Only administrators may update a professional's approval status.
router.patch("/:id/status",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateProfessionalStatusController,
);


// ============================================================
// ADD SPECIALITY TO PROFESSIONAL
// ============================================================

// Only administrators may assign specialties to professionals.
router.post("/:id/specialties",
  authMiddleware,
  authorizeRoles("ADMIN"),
  addProfessionalSpecialityController,
);


// ============================================================
// REMOVE SPECIALITY FROM PROFESSIONAL
// ============================================================

// Only administrators may remove specialties from professionals.
router.delete("/:id/specialties/:specialtyId",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removeProfessionalSpecialityController,
);


export default router;