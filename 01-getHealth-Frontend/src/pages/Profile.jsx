import React from "react";
import { useAuth } from "../context/AuthContext";


const Profile = () => {

  const { user, logout } = useAuth();


  if (!user) {
    return <p>Loading profile...</p>;
  }


  return (

    <main className="p-8">

      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="mt-6">

        <p><strong>Name:</strong>{" "}{user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong>{" "}{user.email}</p>
        <p><strong>Role:</strong>{" "}{user.role}</p>

      </div>

      <button
        onClick={logout}
        className="mt-6 rounded bg-red-600 px-4 py-2 text-white">Logout</button>

    </main>

  );
};


export default Profile;