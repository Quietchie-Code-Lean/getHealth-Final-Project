import React from "react";
import { useAuth } from "../context/AuthContext";

// ============================================================
// PROFILE COMPONENT
// ============================================================

const Profile = () => {
  // Provides access to the authenticated user data and logout action.
  const { user, logout } = useAuth();

  // ============================================================
  // USER VALIDATION
  // ============================================================

  // Displays a loading message while the authenticated user data is not yet available.
  if (!user) {
    return <p>Loading profile...</p>;
  }

  // ============================================================
  // PROFILE RENDER
  // ============================================================

  // Displays the authenticated user's personal information and provides an option to log out of the application.
  return (
    <main className="p-8">
      {/* Displays the profile title */}
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* Displays the authenticated user's information */}
      <div className="mt-6">
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      {/* Logs the authenticated user out of the application */}
      <button
        onClick={logout}
        className="mt-6 rounded bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </main>
  );
};

export default Profile;
