import "dotenv/config";
import { sendEmail } from "../services/email.service.js";

// ============================================================
// EMAIL TEST
// ============================================================

const testEmail = async () => {

  try {

    const emailResponse = await sendEmail({
      to: "leofunesar@gmail.com",
      subject: "getHealth email test",
      html: `
        <h2>getHealth email test</h2>

        <p>
          If you received this email, the Resend configuration is working.
        </p>
      `,
      
    });

    console.log("Email sent successfully:");
    console.log(emailResponse);

  } catch (error) {

    console.error("Error sending email:");
    console.error(error);

  }
};

testEmail();