import "dotenv/config";

import { verifyEmailConnection, sendEmail } from "../services/email.service.js";

await verifyEmailConnection();

await sendEmail({
  to: "LeandroFunes@proton.me",
  subject: "getHealth SMTP Test",
  html: `
    <h1>getHealth</h1>
    <p>MailerSend SMTP is working correctly.</p>
  `,
});

console.log("Test completed.");