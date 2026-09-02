import { useEffect, useState } from "react";

import { createAppointmentRequest } from "../services/Appointment.services.js";

import {
  getProfessionalsRequest,
  getAvailableSlotsRequest,
} from "../services/Professional.services.js";

// ============================================================

// APPOINTMENTS PAGE

// ============================================================

// Handles the appointment scheduling flow for authenticated patients.

const Appointments = () => {
  // ============================================================

  // APPOINTMENT STATE

  // ============================================================

  // Stores the patient's appointments and scheduling data.

  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessionalSpecialties, setSelectedProfessionalSpecialties] = useState([]);

  const [availableSlots, setAvailableSlots] = useState([]);

  // ============================================================

  // FORM STATE

  // ============================================================

  // Stores the values required to create an appointment.

  const [formData, setFormData] = useState({
    professional_id: "",
    specialty_id: "",
    appointment_date: "",
    start_time: "",
    reason: "",
  });

  // ============================================================

  // REQUEST STATE

  // ============================================================

  // Controls loading, submission, and error states.

  const [loadingProfessionals, setLoadingProfessionals] = useState(true);

  const [loadingSlots, setLoadingSlots] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);

  // ============================================================

  // LOAD PROFESSIONALS

  // ============================================================

  // Loads the professionals available for appointment scheduling.

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        setLoadingProfessionals(true);
        setError(null);

        const data = await getProfessionalsRequest();

        setProfessionals(data.professionals || []);
      } catch (error) {
        console.error("Failed to load professionals:", error);

        setProfessionals([]);

        setError("Failed to load professionals.");
      } finally {
        setLoadingProfessionals(false);
      }
    };

    loadProfessionals();
  }, []);

  // ============================================================

  // PROFESSIONAL SELECTION

  // ============================================================

  // Loads the specialties associated with the selected professional.

  const handleProfessionalChange = (event) => {
    const professionalId = event.target.value;

    const selectedProfessional = professionals.find(
      (professional) => professional.id === Number(professionalId),
    );

    setSelectedProfessionalSpecialties(selectedProfessional?.specialties || []);

    setFormData({
      professional_id: professionalId,
      specialty_id: "",
      appointment_date: "",
      start_time: "",
      reason: "",
    });

    setAvailableSlots([]);

    setError(null);
  };

  // ============================================================

  // FORM HANDLING

  // ============================================================

  // Updates the appointment form and resets dependent time slots when needed.

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
      ...(name === "appointment_date" && {
        start_time: "",
      }),
    }));

    if (name === "appointment_date") {
      setAvailableSlots([]);
    }
  };

  // ============================================================

  // LOAD AVAILABLE SLOTS

  // ============================================================

  // Loads available appointment times for the selected professional and date.

  useEffect(() => {
    const loadAvailableSlots = async () => {
      try {
        setLoadingSlots(true);
        setError(null);

        const data = await getAvailableSlotsRequest(
          formData.professional_id,
          formData.appointment_date,
        );

        setAvailableSlots(data.available_slots);
      } catch (error) {
        console.error("Failed to load available slots:", error);

        setAvailableSlots([]);

        setError("No available times for the selected date.");
      } finally {
        setLoadingSlots(false);
      }
    };

    if (formData.professional_id && formData.appointment_date) {
      loadAvailableSlots();
    }
  }, [formData.professional_id, formData.appointment_date]);

  // ============================================================

  // CREATE APPOINTMENT

  // ============================================================

  // Sends the selected appointment data to the backend.

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      const appointmentData = {
        professional_id: Number(formData.professional_id),
        specialty_id: Number(formData.specialty_id),
        appointment_date: formData.appointment_date,
        start_time: formData.start_time,
        reason: formData.reason,
      };

      await createAppointmentRequest(appointmentData);

      setFormData({
        professional_id: "",
        specialty_id: "",
        appointment_date: "",
        start_time: "",
        reason: "",
      });

      setSelectedProfessionalSpecialties([]);

      setAvailableSlots([]);
    } catch (error) {
      console.error("Failed to create appointment:", error);

      setError("Failed to create appointment.");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================

  // APPOINTMENT SCHEDULING FORM

  // ============================================================

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* ============================================================
            APPOINTMENT HEADER
            ============================================================ */}

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-semibold">Schedule Appointment</h1>

          <p className="mt-3 text-gray-400">
            Select a professional, specialty, date, and available appointment
            time.
          </p>
        </div>

        {/* ============================================================
            APPOINTMENT FORM
            ============================================================ */}

        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl p-6">
          {/* ============================================================
              PROFESSIONAL AND SPECIALTY SELECTS
              ============================================================ */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* ============================================================
                SPECIALTY SELECT
                ============================================================ */}

            <div>
              <label
                htmlFor="specialty_id"
                className="mb-2 block text-sm font-medium"
              >
                Specialty
              </label>

              <select
                id="specialty_id"
                name="specialty_id"
                value={formData.specialty_id}
                onChange={handleChange}
                disabled={
                  !formData.professional_id ||
                  selectedProfessionalSpecialties.length === 0
                }
                required
                className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  {!formData.professional_id
                    ? "Select a professional first"
                    : selectedProfessionalSpecialties.length === 0
                      ? "No specialties available"
                      : "Select a specialty"}
                </option>

                {selectedProfessionalSpecialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ============================================================
                PROFESSIONAL SELECT
                ============================================================ */}

            <div>
              <label
                htmlFor="professional_id"
                className="mb-2 block text-sm font-medium"
              >
                Professional
              </label>

              <select
                id="professional_id"
                name="professional_id"
                value={formData.professional_id}
                onChange={handleProfessionalChange}
                disabled={loadingProfessionals}
                required
                className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  {loadingProfessionals
                    ? "Loading professionals..."
                    : "Select a professional"}
                </option>

                {professionals.map((professional) => (
                  <option key={professional.id} value={professional.id}>
                    {professional.first_name} {professional.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ============================================================
              DATE SELECT
              ============================================================ */}

          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-xs">
              <label
                htmlFor="appointment_date"
                className="mb-2 block text-center text-sm font-medium"
              >
                Date
              </label>

              <input
                id="appointment_date"
                name="appointment_date"
                type="date"
                value={formData.appointment_date}
                onChange={handleChange}
                disabled={!formData.professional_id}
                required
                className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* ============================================================
              AVAILABLE TIME SELECT
              ============================================================ */}

          <div className="mx-auto mt-8 w-full max-w-3xl">
            <label
              htmlFor="start_time"
              className="mb-2 block text-sm font-medium"
            >
              Available time
            </label>

            <select
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              disabled={
                !formData.appointment_date ||
                loadingSlots ||
                availableSlots.length === 0
              }
              required
              className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">
                {!formData.appointment_date
                  ? "Select a date first"
                  : loadingSlots
                    ? "Loading available times..."
                    : availableSlots.length === 0
                      ? "No available times"
                      : "Select an available time"}
              </option>

              {availableSlots.map((slot) => (
                <option key={slot.start_time} value={slot.start_time}>
                  {slot.start_time} - {slot.end_time}
                </option>
              ))}
            </select>
          </div>

          {/* ============================================================
              APPOINTMENT REASON
              ============================================================ */}

          <div className="mx-auto mt-8 w-full max-w-3xl">
            <label htmlFor="reason" className="mb-2 block text-sm font-medium">
              Reason
            </label>

            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="4"
              className="w-full resize-none rounded-md border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-gray-400"
            />
          </div>

          {/* ============================================================
              ERROR MESSAGE
              ============================================================ */}

          {error && (
            <p className="mt-6 text-center text-sm text-red-400">{error}</p>
          )}

          {/* ============================================================
              SUBMIT APPOINTMENT
              ============================================================ */}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md border border-gray-500 px-6 py-2 font-medium transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Schedule appointment"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Appointments;
