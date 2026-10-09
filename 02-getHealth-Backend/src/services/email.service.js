import nodemailer from "nodemailer";


// ============================================================
// EMAIL CLIENT CONFIGURATION
// ============================================================


// Creates the Nodemailer transporter using the SMTP Provider.
// credentials stored in Evironment Variables.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS ,
  },
});

// ============================================================
// SEND EMAIL
// ============================================================

// Sends a generic transactional email using Nodemailer.
export const sendEmail = async ({ to, subject, html }) => {

  console.log("Nodemailer sendEmail called");
  console.log("From:", process.env.EMAIL_FROM);
  console.log("To:", to);

  // Never log the actual SMTP key.
  console.log(
    "SMTP credentials configured:",
    Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
  );


  // ============================================================
  // EMAIL SAFETY SWITCH
  // ============================================================

  // Allows email delivery to be disabled without affecting
  // appointment creation or the rest of the application.
  if (process.env.EMAIL_ENABLED !== "true") {
    console.log("Email sending is currently disabled.");

    return null;

  }

  const emailData = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  };

  try {

    const info = await transporter.sendMail(emailData);

    console.log("Nodemailer response:", info.messageId);

    return info;

  } catch (error) {

    console.error("Nodemailer sendMail failed:", error);

    throw error;

  }

};