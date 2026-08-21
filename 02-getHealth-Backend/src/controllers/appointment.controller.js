import {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  rescheduleAppointment,
  cancelAppointment,
  updateAppointmentStatus,
} from "../services/appointment.service.js";

import {
  formatAppointmentResponse,
  formatAppointmentWithRelations,
  formatAppointmentDetail,
  formatRescheduledAppointment,
  formatCancelledAppointment,
  formatAppointmentStatus,
} from "../utils/appointment.utils.js";

// ============================================================
// CREATE APPOINTMENT
// ============================================================

// Creates a new appointment for the authenticated patient.
export const createAppointmentController = async (req, res, next) => {
  try {
    // Get the authenticated user's id from the authentication middleware.
    const userId = req.user.id;

    // Get appointment data from the request body.
    const {
      professional_id,
      specialty_id,
      appointment_date,
      start_time,
      reason,
    } = req.body;

    // Delegate appointment creation and business validation to the service.
    const appointment = await createAppointment(userId, {
      professional_id,
      specialty_id,
      appointment_date,
      start_time,
      reason,
    });

    // Return the appointment using the API response format.
    return res.status(201).json({
      message: "Appointment created successfully",
      appointment: formatAppointmentResponse(appointment),
    });
  } catch (error) {
    // Pass the error to the global error handler.
    next(error);
  }
};

// ============================================================
// GET MY APPOINTMENTS
// ============================================================

// Returns appointments associated with the authenticated user.
export const getMyAppointmentsController = async (req, res, next) => {
  try {
    // Get authentication information from the middleware.
    const userId = req.user.id;
    const role = req.user.role;

    // Delegate appointment retrieval to the service.
    const appointments = await getMyAppointments(userId, role);

    // Format each appointment according to the API contract.
    const formattedAppointments = appointments.map(
      formatAppointmentWithRelations,
    );

    // Return the user's appointments.
    return res.status(200).json({
      appointments: formattedAppointments,
    });
  } catch (error) {
    // Pass the error to the global error handler.
    next(error);
  }
};

// ============================================================
// GET APPOINTMENT BY ID
// ============================================================

// Returns a specific appointment after validating user access.
export const getAppointmentByIdController = async (req, res, next) => {
  try {
    // Get the appointment id from the route parameters.
    const { id } = req.params;

    // Get the authenticated user's identity and role.
    const userId = req.user.id;
    const role = req.user.role;

    // Delegate appointment lookup and authorization checks to the service.
    const appointment = await getAppointmentById(id, userId, role);

    // Format the appointment according to the API contract.
    const formattedAppointment = formatAppointmentDetail(appointment);

    // Return the requested appointment.
    return res.status(200).json({
      appointment: formattedAppointment,
    });
  } catch (error) {
    // Pass the error to the global error handler.
    next(error);
  }
};

// ============================================================
// RESCHEDULE APPOINTMENT
// ============================================================

// Reschedules an existing appointment to a new date and time.
export const rescheduleAppointmentController = async (req, res, next) => {
  try {
    // Get the appointment id from the route parameters.
    const { id } = req.params;

    // Get the authenticated user's identity and role.
    const userId = req.user.id;
    const role = req.user.role;

    // Get the new appointment date and time from the request body.
    const { appointment_date, start_time } = req.body;

    // Delegate validation and rescheduling logic to the service.
    const appointment = await rescheduleAppointment(id, userId, role, {
      appointment_date,
      start_time,
    });

    // Format the updated appointment according to the API contract.
    const formattedAppointment = formatRescheduledAppointment(appointment);

    // Return the updated appointment.
    return res.status(200).json({
      message: "Appointment rescheduled successfully",
      appointment: formattedAppointment,
    });
  } catch (error) {
    // Pass the error to the global error handler.
    next(error);
  }
};

// ============================================================
// CANCEL APPOINTMENT
// ============================================================

// Cancels an existing appointment.
export const cancelAppointmentController = async (req, res, next) => {
  try {
    // Get the appointment id from the route parameters.
    const { id } = req.params;

    // Get the authenticated user's identity and role.
    const userId = req.user.id;
    const role = req.user.role;

    // Get the cancellation reason from the request body.
    const { cancellation_reason } = req.body;

    // Delegate cancellation logic to the service.
    const appointment = await cancelAppointment(
      id,
      userId,
      role,
      cancellation_reason,
    );

    // Format the cancelled appointment according to the API contract.
    const formattedAppointment = formatCancelledAppointment(appointment);

    // Return the cancelled appointment.
    return res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment: formattedAppointment,
    });
  } catch (error) {
    // Pass the error to the global error handler.
    next(error);
  }
};

// ============================================================
// UPDATE APPOINTMENT STATUS
// ============================================================

// Updates the status of an existing appointment.
export const updateAppointmentStatusController = async (req, res, next) => {
  try {
    // Get the appointment id from the route parameters.
    const { id } = req.params;

    // Get the authenticated user's identity and role.
    const userId = req.user.id;
    const role = req.user.role;

    // Get the requested status from the request body.
    const { status } = req.body;

    // Delegate status validation and transition rules to the service.
    const appointment = await updateAppointmentStatus(id, userId, role, status);

    // Format the updated status according to the API contract.
    const formattedAppointment = formatAppointmentStatus(appointment);

    // Return the updated appointment status.
    return res.status(200).json({
      message: "Appointment status updated successfully",
      appointment: formattedAppointment,
    });
  } catch (error) {
    // Pass the error to the global error handler.
    next(error);
  }
};
