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

  const emailData = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(emailData);

  return info;
};