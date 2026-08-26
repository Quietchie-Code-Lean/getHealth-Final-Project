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
