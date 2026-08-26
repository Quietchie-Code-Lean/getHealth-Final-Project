import {
  validateAvailabilityWeekday,
  validateAvailabilityTimeRange,
  validateAvailabilitySlotDuration,
  validateAvailabilityActiveStatus,
} from "../utils/availabilityValidation.utils.js";

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

    // Validate required fields.
    if (
      weekday === undefined ||
      start_time === undefined ||
      end_time === undefined ||
      slot_duration === undefined
    ) {

      const error = new Error("Weekday, start time, end time, and slot duration are required.");
      error.statusCode = 400;
      throw error;
    }

    // Validate availability fields.
    validateAvailabilityWeekday(weekday);
    validateAvailabilityTimeRange(start_time, end_time);
    validateAvailabilitySlotDuration(slot_duration);

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

    // Validate required fields.
    if (
      weekday === undefined ||
      start_time === undefined ||
      end_time === undefined ||
      slot_duration === undefined ||
      is_active === undefined
    ) {

      const error = new Error("Weekday, start time, end time, slot duration, and active status are required.");
      error.statusCode = 400;
      throw error;
    }

    // Validate availability fields.
    validateAvailabilityWeekday(weekday);
    validateAvailabilityTimeRange(start_time, end_time);
    validateAvailabilitySlotDuration(slot_duration);
    validateAvailabilityActiveStatus(is_active);

    next();

  } catch (error) {

    next(error);
  }
};