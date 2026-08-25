// ============================================================
// APPOINTMENT RESPONSE MAPPERS
// ============================================================

// Converts a Prisma appointment into the API response format.
export const formatAppointmentResponse = (appointment) => {
  return {
    id: appointment.id,
    patient_id: appointment.patientProfileId,
    professional_id: appointment.professionalProfileId,
    specialty_id: appointment.specialityId,
    appointment_date: appointment.appointmentDate,
    start_time: appointment.startAppointment,
    end_time: appointment.endAppointment,
    status: appointment.status,
    reason: appointment.reason,
    cancellation_reason: appointment.cancellationReason,
    created_at: appointment.createdAt,
    updated_at: appointment.updatedAt,
  };
};

// Converts an appointment with related profiles into the /me response format.
export const formatAppointmentWithRelations = (appointment) => {
  return {
    id: appointment.id,
    appointment_date: appointment.appointmentDate,
    start_time: appointment.startAppointment,
    end_time: appointment.endAppointment,
    status: appointment.status,
    reason: appointment.reason,

    patient: {
      id: appointment.patientProfile.id,
      first_name: appointment.patientProfile.user.firstName,
      last_name: appointment.patientProfile.user.lastName,
    },

    professional: {
      id: appointment.professionalProfile.id,
      first_name: appointment.professionalProfile.user.firstName,
      last_name: appointment.professionalProfile.user.lastName,
    },

    specialty: {
      id: appointment.speciality.id,
      name: appointment.speciality.name,
    },
  };
};

// Converts an appointment with relations into the detailed /:id response format.
export const formatAppointmentDetail = (appointment) => {
  return {
    id: appointment.id,
    appointment_date: appointment.appointmentDate,
    start_time: appointment.startAppointment,
    end_time: appointment.endAppointment,
    status: appointment.status,
    reason: appointment.reason,
    cancellation_reason: appointment.cancellationReason,

    patient: {
      id: appointment.patientProfile.id,
      first_name: appointment.patientProfile.user.firstName,
      last_name: appointment.patientProfile.user.lastName,
    },

    professional: {
      id: appointment.professionalProfile.id,
      first_name: appointment.professionalProfile.user.firstName,
      last_name: appointment.professionalProfile.user.lastName,
    },

    specialty: {
      id: appointment.speciality.id,
      name: appointment.speciality.name,
    },

    created_at: appointment.createdAt,
    updated_at: appointment.updatedAt,
  };
};

// Converts an appointment into the reschedule response format.
export const formatRescheduledAppointment = (appointment) => {
  return {
    id: appointment.id,
    appointment_date: appointment.appointmentDate,
    start_time: appointment.startAppointment,
    end_time: appointment.endAppointment,
    status: appointment.status,
    updated_at: appointment.updatedAt,
  };
};

// Converts an appointment into the cancellation response format.
export const formatCancelledAppointment = (appointment) => {
  return {
    id: appointment.id,
    status: appointment.status,
    cancellation_reason: appointment.cancellationReason,
    updated_at: appointment.updatedAt,
  };
};

// Converts an appointment into the status update response format.
export const formatAppointmentStatus = (appointment) => {
  return {
    id: appointment.id,
    status: appointment.status,
    updated_at: appointment.updatedAt,
  };
};
