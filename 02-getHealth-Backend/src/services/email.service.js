import { Resend } from "resend";

// ============================================================
// EMAIL CLIENT CONFIGURATION
// ============================================================

// Creates the Resend client using the API key stored in .env.
const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================
// SEND EMAIL
// ============================================================

// Sends a generic email using Resend.
export const sendEmail = async ({ to, subject, html }) => {
  const emailData = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  const { data, error } = await resend.emails.send(emailData);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};