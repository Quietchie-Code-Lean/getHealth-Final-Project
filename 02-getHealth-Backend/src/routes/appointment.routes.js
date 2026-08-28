import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { appointmentDateMiddleware } from "../middlewares/validation.middleware.js";

import {
  createAppointmentController,
  getMyAppointmentsController,
  getAppointmentByIdController,
  rescheduleAppointmentController,
  cancelAppointmentController,
  updateAppointmentStatusController,
} from "../controllers/appointment.controller.js";

const router = Router();

// ============================================================
// CREATE APPOINTMENT
// ============================================================

// Creates an appointment. Only patients are authorized.
router.post(
  "/",
  authMiddleware,
  authorizeRoles("PATIENT"),
  appointmentDateMiddleware,
  createAppointmentController,
);

// ============================================================
// GET MY APPOINTMENTS
// ============================================================

// Returns appointments associated with the authenticated user.
router.get(
  "/me",
  authMiddleware,
  authorizeRoles("PATIENT", "PROFESSIONAL"),
  getMyAppointmentsController,
);

// ============================================================
// GET APPOINTMENT BY ID
// ============================================================

// Returns an appointment by ID for authorized users.
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("PATIENT", "PROFESSIONAL", "ADMIN"),
  getAppointmentByIdController,
);

// ============================================================
// RESCHEDULE APPOINTMENT
// ============================================================

// Reschedules an appointment. Patients and administrators are authorized.
router.patch(
  "/:id/reschedule",
  authMiddleware,
  authorizeRoles("PATIENT", "ADMIN"),
  appointmentDateMiddleware,
  rescheduleAppointmentController,
);

// ============================================================
// CANCEL APPOINTMENT
// ============================================================

// Cancels an appointment for authorized users.
router.patch(
  "/:id/cancel",
  authMiddleware,
  authorizeRoles("PATIENT", "PROFESSIONAL", "ADMIN"),
  cancelAppointmentController,
);

// ============================================================
// UPDATE APPOINTMENT STATUS
// ============================================================

// Updates appointment status. Professionals and administrators are authorized.
router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles("PROFESSIONAL", "ADMIN"),
  updateAppointmentStatusController,
);
export default router;
