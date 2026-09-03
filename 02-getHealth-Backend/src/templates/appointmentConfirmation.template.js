

// ============================================================
// APPOINTMENT CONFIRMATION EMAIL TEMPLATE
// ============================================================

export const appointmentConfirmationTemplate = ({
    patientName,
    professionalName,
    specialtyName,
    appointmentDate,
    startAppointment
}) => {

    const bodyStyle = `
  margin: 0;
  padding: 0;
  background-color: #f4f6f8;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
`;

    const containerStyle = `
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 16px;
`;

    const cardStyle = `
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

    const headerStyle = `
  padding: 24px;
  background-color: #1e293b;
  text-align: center;
`;

    const headerTitleStyle = `
  margin: 0;
  color: #ffffff;
  font-size: 24px;
`;

    const contentStyle = `
  padding: 32px;
`;

    const titleStyle = `
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 22px;
  color: #111827;
`;

    const paragraphStyle = `
  margin-bottom: 16px;
  line-height: 1.6;
`;

    const descriptionStyle = `
  margin-bottom: 24px;
  line-height: 1.6;
`;

    const appointmentDetailsStyle = `
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
`;

    const detailRowStyle = `
  margin: 0 0 12px;
`;

    const lastDetailRowStyle = `
  margin: 0;
`;

    const footerStyle = `
  padding: 20px 32px;
  background-color: #f8fafc;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 12px;
  color: #6b7280;
`;

    const footerTextStyle = `
  margin: 0;
`;

    const footerCopyrightStyle = `
  margin: 8px 0 0;
`;

    return `
  <div style="${bodyStyle}">
    <div style="${containerStyle}">
      <div style="${cardStyle}">

        <div style="${headerStyle}">
          <h1 style="${headerTitleStyle}">
            getHealth
          </h1>
        </div>

        <div style="${contentStyle}">
          <h2 style="${titleStyle}">
            Appointment confirmed
          </h2>

          <p style="${paragraphStyle}">
            Hello ${patientName},
          </p>

          <p style="${descriptionStyle}">
            Your appointment has been successfully scheduled.
            Here are the details:
          </p>

          <div style="${appointmentDetailsStyle}">
            <p style="${detailRowStyle}">
              <strong>Professional:</strong>
              ${professionalName}
            </p>

            <p style="${detailRowStyle}">
              <strong>Specialty:</strong>
              ${specialtyName}
            </p>

            <p style="${detailRowStyle}">
              <strong>Date:</strong>
              ${appointmentDate}
            </p>

            <p style="${lastDetailRowStyle}">
              <strong>Time:</strong>
              ${startAppointment}
            </p>
          </div>

          <p style="${paragraphStyle}">
            Please arrive a few minutes before your scheduled appointment.
          </p>

          <p style="${lastDetailRowStyle}">
            Thank you for choosing getHealth.
          </p>
        </div>

        <div style="${footerStyle}">
          <p style="${footerTextStyle}">
            This is an automated appointment confirmation email.
          </p>

          <p style="${footerCopyrightStyle}">
            © 2026 getHealth
          </p>
        </div>

      </div>
    </div>
  </div>
`;
};