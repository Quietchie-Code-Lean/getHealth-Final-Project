import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserById,
  registerPatient,
  registerProfessional,
} from "../services/auth.service.js";
import { emptyToUndefined } from "../utils/helpers.js";

// ============================================================
// OPTIONAL DATE VALIDATION
// ============================================================

// Converts an optional date value into a Date object and validates the provided date format before it is stored.
const optionalDate = (value) => {
  const cleanValue = emptyToUndefined(value);

  if (!cleanValue) {
    return undefined;
  }

  const parsedDate = new Date(cleanValue);
  if (Number.isNaN(parsedDate.getTime())) {
    const error = new Error("Invalid date of birth");
    error.statusCode = 400;
    throw error;
  }

  return parsedDate;
};

// ============================================================
// PATIENT REGISTRATION
// ============================================================

// Registers a new patient account after validating the email, hashing the password, and creating the patient profile.
export const registerPatientController = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      identificationNumber,
    } = req.body;

    // Checks whether an account already exists with the provided email.
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hashes the user's password before storing it in the database.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creates the patient account and associated patient profile.
    const user = await registerPatient({
      firstName,
      lastName,
      email,
      hashedPassword,
      phone,
      dateOfBirth: optionalDate(dateOfBirth),
      identificationNumber,
    });

    // Returns the newly created patient information without exposing sensitive authentication data such as the password hash.
    return res.status(201).json({
      message: "Patient registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        patientProfile: user.patientProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// PROFESSIONAL REGISTRATION
// ============================================================

// Registers a new professional account after validating the email hashing the password, and creating the professional profile.
export const registerProfessionalController = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      licenseNumber,
      specialityId,
      dateOfBirth,
      identificationNumber,
    } = req.body;

    // Checks whether an account already exists with the provided email.
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hashes the user's password before storing it in the database.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creates the professional account and associated professional profile.
    const user = await registerProfessional({
      firstName,
      lastName,
      email,
      hashedPassword,
      licenseNumber,
      specialityId,
      dateOfBirth: optionalDate(dateOfBirth),
      identificationNumber,
    });

    // Returns the newly created professional information without exposing sensitive authentication data such as the password hash.
    return res.status(201).json({
      message: "Professional registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        professionalProfile: user.professionalProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// USER LOGIN
// ============================================================

// Authenticates the user credentials, validates the account status, and generates a JWT token for authenticated requests.
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Ensures the JWT secret is configured before generating tokens.
    if (!process.env.JWT_SECRET) {
      const error = new Error("JWT_SECRET is not configured");
      error.statusCode = 500;
      throw error;
    }

    // Retrieves the user account associated with the provided email.
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compares the submitted password with the stored password hash.
    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Prevents inactive accounts from accessing the application.
    if (!user.isActive) {
      return res.status(403).json({
        message: "User account is inactive",
      });
    }

    // Generates a JWT containing the user's identity and role.
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );

    // Returns the authentication token and basic user information required by the client after a successful login.
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// USER PROFILE
// ============================================================

// Retrieves the authenticated user's information and returns the profile associated with the user's role.
export const profileController = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Retrieves the authenticated user using the ID provided by the authentication middleware.
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    // Returns the user's basic information together with the profile corresponding to their assigned role.
    return res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      profile:
        user.role === "PATIENT"
          ? user.patientProfile
          : user.professionalProfile,
    });
  } catch (error) {
    next(error);
  }
};
