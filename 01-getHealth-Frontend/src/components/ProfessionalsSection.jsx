import React, { useEffect, useState } from "react";
import CardGen from "./CardGen.jsx";
import { useNavigate } from "react-router-dom";

import { getProfessionalsRequest } from "../services/Professional.services.js";

// ============================================================
// PROFESSIONALS SECTION COMPONENT
// ============================================================

// Displays professionals retrieved from the backend.
const ProfessionalsSection = () => {
  const navigate = useNavigate();
  /* Preset Tailwind Styles */
  const btnProfClass = "rounded-lg bg-blue-600 px-4 py-2 text-white";
  const cardsContainer = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  // ============================================================
  // PROFESSIONALS STATE
  // ============================================================

  // Stores the professionals returned by the API.
  const [professionals, setProfessionals] = useState([]);

  // Tracks the professionals loading state.
  const [loading, setLoading] = useState(true);

  // Stores an error message when professionals cannot be loaded.
  const [error, setError] = useState(null);

  // ============================================================
  // LOAD PROFESSIONALS
  // ============================================================

  // Loads professionals from the backend when the component mounts.
  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProfessionalsRequest();

        setProfessionals(data.professionals || []);
      } catch (error) {
        console.error("Failed to load professionals:", error);

        setProfessionals([]);
        setError("Failed to load professionals.");
      } finally {
        setLoading(false);
      }
    };

    loadProfessionals();
  }, []);

  // ============================================================
  // PROFESSIONALS SECTION RENDER
  // ============================================================

  return (
    <div>
      <h1>Meet our Professionals:</h1>
      <br />
      <h3>Find the care you need</h3>
      <br />
      {/* ============================================================
          LOADING STATE
          ============================================================ */}
      {loading && <p>Loading professionals...</p>}
      {/* ============================================================
          ERROR STATE
          ============================================================ */}
      {!loading && error && <p>{error}</p>}
      {/* ============================================================
          EMPTY STATE
          ============================================================ */}
      {!loading && !error && professionals.length === 0 && (
        <p>No professionals available.</p>
      )}
      {/* ============================================================
          PROFESSIONAL CARDS
          ============================================================ */}
      {!loading && !error && professionals.length > 0 && (
        <div className={cardsContainer}>
          {professionals.slice(0, 3).map((professional) => (
            <CardGen
              key={professional.id}
              title={`${professional.first_name} ${professional.last_name}`}
              icon=""
              description={
                professional.specialties?.length > 0
                  ? professional.specialties
                      .map((specialty) => specialty.name)
                      .join(", ")
                  : "Healthcare professional"
              }
            />
          ))}
        </div>
      )}
      {/* ============================================================
          VIEW ALL PROFESSIONALS
          ============================================================ */}
      <button
        className={btnProfClass}
        onClick={() => navigate("/professionals")}
      >
        View all professionals
      </button>{" "}
    </div>
  );
};

export default ProfessionalsSection;
