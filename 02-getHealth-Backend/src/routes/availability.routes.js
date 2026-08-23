import { Router } from "express";

import {
  getProfessionalAvailabilityController,
  createProfessionalAvailabilityController,
  updateAvailabilityController,
  deleteAvailabilityController,
  getProfessionalAvailableSlotsController,
} from "../controllers/availability.controllers.js";

import { validateTokenMiddleware } from "../middlewares/validateToken.middleware.js";


const router = Router();


// GET PROFESSIONAL AVAILABILITY
router.get(
  "/professionals/:id/availability",
  getProfessionalAvailabilityController
);


// CREATE PROFESSIONAL AVAILABILITY
router.post(
  "/professionals/:id/availability",
  validateTokenMiddleware,
  createProfessionalAvailabilityController
);


// UPDATE AVAILABILITY
router.put(
  "/availability/:id",
  validateTokenMiddleware,
  updateAvailabilityController
);


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


export default router;