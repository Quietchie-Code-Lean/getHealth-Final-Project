import { Router } from "express";

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

// Creates a new appointment for a patient.
router.post("/", createAppointmentController);

// ============================================================
// GET MY APPOINTMENTS
// ============================================================

// Returns appointments associated with the authenticated user.
router.get("/me", getMyAppointmentsController);

// ============================================================
// GET APPOINTMENT BY ID
// ============================================================

// Returns a specific appointment.
router.get("/:id", getAppointmentByIdController);

// ============================================================
// RESCHEDULE APPOINTMENT
// ============================================================

// Changes the date and time of an existing appointment.
router.patch("/:id/reschedule", rescheduleAppointmentController);

// ============================================================
// CANCEL APPOINTMENT
// ============================================================

// Cancels an existing appointment.
router.patch("/:id/cancel", cancelAppointmentController);

// ============================================================
// UPDATE APPOINTMENT STATUS
// ============================================================

// Updates the status of an existing appointment.
router.patch("/:id/status", updateAppointmentStatusController);

export default router;
