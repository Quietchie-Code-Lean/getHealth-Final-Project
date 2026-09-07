import "dotenv/config";

import { sendEmail } from "../services/email.service.js";

// ============================================================
// NODEMAILER TEST
// ============================================================

const testEmail = async () => {
  try {
    await sendEmail({
      to: "leofunesar@gmail.com",
      subject: "getHealth - Nodemailer test",
      html: `
        <h1>getHealth</h1>
        <p>Nodemailer is working correctly.</p>
      `,
    });

    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

testEmail();