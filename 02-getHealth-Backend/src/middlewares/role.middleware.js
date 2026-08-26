// ============================================================
// ROLE AUTHORIZATION
// ============================================================

// Authorizes users based on their assigned role.
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check whether the authenticated user has a valid role.
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: "User role is required.",
      });
    }

    // Check whether the user's role is allowed.
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });
    }

    next();
  };
};
