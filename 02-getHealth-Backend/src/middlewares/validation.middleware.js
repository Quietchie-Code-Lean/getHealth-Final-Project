import { timeToMinutes } from "../utils/dateTime.utils.js";


// ============================================================
// LOGIN CREDENTIALS VALIDATION
// ============================================================

// Validates the credentials required to authenticate a user.
export const credentialsMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  // Validate field types
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({
      success: false,
      message: "Email and password must be strings.",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  // Validate password is not empty
  if (!password.trim()) {
    return res.status(400).json({
      success: false,
      message: "Password cannot be empty.",
    });
  }

  next();
};

// ============================================================
// PATIENT REGISTRATION VALIDATION
// ============================================================

// Validates the required data for patient registration.
export const registerPatientMiddleware = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "First name, last name, email, and password are required.",
    });
  }

  // Validate required field types
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "First name, last name, email, and password must be strings.",
    });
  }

  // Validate required text fields are not empty
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Required fields cannot be empty.",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  next();
};

// ============================================================
// PROFESSIONAL REGISTRATION VALIDATION
// ============================================================

// Validates the required data for professional registration.
export const registerProfessionalMiddleware = (req, res, next) => {
  const { firstName, lastName, email, password, licenseNumber, specialityId } =
    req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !licenseNumber ||
    !specialityId
  ) {
    return res.status(400).json({
      success: false,
      message:
        "First name, last name, email, password, license number, and speciality ID are required.",
    });
  }

  // Validate required field types
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof licenseNumber !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "First name, last name, email, password, and license number must be strings.",
    });
  }

  // Validate required text fields are not empty
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !password.trim() ||
    !licenseNumber.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Required fields cannot be empty.",
    });
  }

  // Validate speciality ID
  if (!Number.isInteger(Number(specialityId))) {
    return res.status(400).json({
      success: false,
      message: "Speciality ID must be a valid integer.",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  next();
};


// ============================================================
// CREATE AVAILABILITY VALIDATION
// ============================================================

// Validates the data required to create a professional availability schedule.
export const createAvailabilityMiddleware = (req, res, next) => {

  try {

    const {
      weekday,
      start_time,
      end_time,
      slot_duration,
    } = req.body;

    const allowedWeekdays = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    // Validate required fields.
    if (
      !weekday ||
      !start_time ||
      !end_time ||
      slot_duration === undefined
    ) {

      const error = new Error("Weekday, start time, end time, and slot duration are required.");

      error.statusCode = 400;

      throw error;
    }

    // Validate weekday.
    if (typeof weekday !== "string" || !allowedWeekdays.includes(weekday)) {

      const error = new Error("Invalid weekday.");
      error.statusCode = 400;

      throw error;
    }

    // Validate time field types.
    if (typeof start_time !== "string" || typeof end_time !== "string") {

      const error = new Error("Start time and end time must be strings.");

      error.statusCode = 400;

      throw error;
    }

    // Convert and validate time values.
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);

    // Validate time range.
    if (startMinutes >= endMinutes) {

      const error = new Error(
        "Start time must be earlier than end time."
      );

      error.statusCode = 400;

      throw error;
    }

    // Validate slot duration.
    if (!Number.isInteger(slot_duration) || slot_duration <= 0) {

      const error = new Error("Slot duration must be a positive integer.");

      error.statusCode = 400;

      throw error;
    }

    next();

  } catch (error) {

    next(error);
  }
};



// ============================================================
// UPDATE AVAILABILITY VALIDATION
// ============================================================

// Validates the data required to update a professional availability schedule.
export const updateAvailabilityMiddleware = (req, res, next) => {

  try {

    const {
      weekday,
      start_time,
      end_time,
      slot_duration,
      is_active,
    } = req.body;

    const allowedWeekdays = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    // Validate required fields.
    if (
      !weekday ||
      !start_time ||
      !end_time ||
      slot_duration === undefined ||
      is_active === undefined
    ) {

      const error = new Error(
        "Weekday, start time, end time, slot duration, and active status are required."
      );

      error.statusCode = 400;

      throw error;
    }

    // Validate weekday.
    if (
      typeof weekday !== "string" ||
      !allowedWeekdays.includes(weekday)
    ) {

      const error = new Error("Invalid weekday.");
      error.statusCode = 400;

      throw error;
    }

    // Validate time field types.
    if (
      typeof start_time !== "string" ||
      typeof end_time !== "string"
    ) {

      const error = new Error(
        "Start time and end time must be strings."
      );

      error.statusCode = 400;

      throw error;
    }

    // Convert and validate time values.
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);

    // Validate time range.
    if (startMinutes >= endMinutes) {

      const error = new Error(
        "Start time must be earlier than end time."
      );

      error.statusCode = 400;

      throw error;
    }

    // Validate slot duration.
    if (
      !Number.isInteger(slot_duration) ||
      slot_duration <= 0
    ) {

      const error = new Error(
        "Slot duration must be a positive integer."
      );

      error.statusCode = 400;

      throw error;
    }

    // Validate active status.
    if (typeof is_active !== "boolean") {

      const error = new Error(
        "Active status must be a boolean."
      );

      error.statusCode = 400;

      throw error;
    }

    next();

  } catch (error) {

    next(error);
  }
};