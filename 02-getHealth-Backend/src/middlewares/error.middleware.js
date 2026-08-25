// ============================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================

// Handles application errors and returns a consistent response to the client based on the type and status of the error.
export const errorMiddleware = (err, req, res, next) => {
  // Logs the error details to help identify and debug unexpected application failures.
  console.error(err);

  // ============================================================
  // UNIQUE CONSTRAINT ERROR
  // ============================================================

  // Handles Prisma unique constraint violations and returns a conflict response when a duplicate value is detected.
  if (err.code === "P2002") {
    return res.status(409).json({
      message: "A record with this unique value already exists",
    });
  }

  // ============================================================
  // ERROR STATUS
  // ============================================================

  // Determines the HTTP status code defined by the error or falls back to an internal server error.
  const statusCode = err.statusCode || err.status || 500;

  // ============================================================
  // ERROR RESPONSE
  // ============================================================

  // Returns the error message to the client while providing a default message when no specific message is available.
  return res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};
