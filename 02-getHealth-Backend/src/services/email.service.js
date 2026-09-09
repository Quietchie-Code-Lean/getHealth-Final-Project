import nodemailer from "nodemailer";


// ============================================================
// EMAIL CLIENT CONFIGURATION
// ============================================================


// Creates the Nodemailer transporter using the Gmail account
// credentials stored in .env.
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// ============================================================
// SEND EMAIL
// ============================================================

// Sends a generic email using Nodemailer.
export const sendEmail = async ({ to, subject, html }) => {

  console.log("Nodemailer sendEmail called");
  console.log("From:", process.env.EMAIL_USER);
  console.log("To:", to);

  // Never log the actual password.
  console.log(
    "App password configured:",
    Boolean(process.env.EMAIL_APP_PASSWORD),
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
    from: process.env.EMAIL_USER,
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