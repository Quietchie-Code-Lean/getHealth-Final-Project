import jwt from "jsonwebtoken";

// ============================================================
// TOKEN VALIDATION MIDDLEWARE
// ============================================================

// Validates the authentication token provided by the clien and attaches the decoded user information to the request.
export const validateTokenMiddleware = (req, res, next) => {
  try {
    // ============================================================
    // AUTHORIZATION HEADER
    // ============================================================

    // Retrieves the authorization header containing the bearer token.
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Token is required",
      });
    }

    // ============================================================
    // TOKEN FORMAT VALIDATION
    // ============================================================

    // Extracts the authentication type and token from the authorization header.
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    // ============================================================
    // TOKEN VERIFICATION
    // ============================================================

    // Verifies the token signature and expiration using the configured JWT secret.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attaches the decoded user information to the request so protected controllers can identify the authenticated user.
    req.user = decoded;

    next();
  } catch (error) {
    // Rejects the request when the token is invalid or expired.
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
