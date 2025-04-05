import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.API_KEY);

const createVerificationEmail = (receiverEmail, OTP) => {
  return {
    from: "UZI <onboarding@resend.dev>",
    to: receiverEmail,
    subject: "Email Verification",
    html: `<h3>Your OTP for verification is <b>${OTP.OTP}</b>. Valid for 10 minutes.</h3>`,
  };
};

const sendMail = async (emailData) => {
  try {
    const { error } = await resend.emails.send(emailData);
    if (error) {
      console.error("Error sending email:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

export { createVerificationEmail, sendMail };
