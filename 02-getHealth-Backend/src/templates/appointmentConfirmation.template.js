

// ============================================================
// APPOINTMENT CONFIRMATION EMAIL TEMPLATE
// ============================================================

export const appointmentConfirmationTemplate = ({
    patientName,
    professionalName,
    specialtyName,
    appointmentDate,
    startAppointment,
}) => {

    return `
    <div>

            <h2>Appointment confirmed</h2>

            <p>Hello ${patientName},</p>

            <p>Your appointment has been successfully scheduled.</p>

            <p>
                <strong>Professional:</strong> ${professionalName}
            </p>

            <p>
                <strong>Specialty:</strong> ${specialtyName}
            </p>

            <p>
                <strong>Date:</strong> ${appointmentDate}
            </p>

            <p>
                <strong>Time:</strong> ${startAppointment}
            </p>

            <p>
                Thank you for using getHealth.
            </p>
      
    </div>
  `;

};