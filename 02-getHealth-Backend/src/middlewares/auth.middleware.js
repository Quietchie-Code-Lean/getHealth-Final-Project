import jwt from "jsonwebtoken";

// ============================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================

// Verifies the JWT provided by the client and attaches the authenticated user's information to the request.
export const authMiddleware = (req, res, next) => {
  // ============================================================
  // TOKEN EXTRACTION
  // ============================================================

  // Retrieves the authorization header and extracts the bearer token.
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token required",
    });
  }

  const token = authHeader.split(" ")[1];

  // ============================================================
  // TOKEN VALIDATION
  // ============================================================

  // Verifies the token signature and decodes the authenticated user's information.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Stores the decoded user information in the request so protected controllers can access the authenticated user.
    req.user = decoded;

    next();
  } catch (error) {
    // Rejects the request when the token is invalid or expired.
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
