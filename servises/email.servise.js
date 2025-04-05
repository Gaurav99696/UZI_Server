import nodemailer from "nodemailer";

const createVerificationEmail = (receiverEmail, OTP) => {
  const email = {
    from: '"UZI" <gauravmishra99696@gmail.com>',
    to: receiverEmail,
    subject: "Email Verification",
    text: "This is a verification Email from Scot.",
    html: `<h3>Your OTP for verification is ${OTP.OTP}. Valid for 10 minutes.</h3>`,
  };
  return email;
};

const sendMail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "uzi.v12025@gmail.com",
        pass: "anpz bkpn zdyg dgck",
      },
    });
    return transporter.sendMail(email, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { createVerificationEmail, sendMail };
