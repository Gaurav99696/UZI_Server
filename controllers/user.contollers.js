import { validateRegisterInput } from "../validations/user.validation.js";
import { findUserBy, createUser, getOtp } from "../servises/user.servise.js";
import bcrypt from "bcrypt";

// Registering an user
const register = async (req, res) => {
  try {
    let data = req.body;

    // Validating user input
    let { error } = validateRegisterInput(data);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // checking if user exists
    const existingUser = await findUserBy("email", data.email);
    if (existingUser) {
      return res.status(400).send({ message: "emailAlreadyRegistered" });
    }

    // hashing the password
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;

    // creating user
    const user = await createUser(data);

    // generating the OTP
    const OTP = await getOtp(user.email, "register");
    if (!OTP) {
      return res.status(400).send({ message: "errorGeneratingOTP" });
    }

    // creating the verification mail
    // const VerificationEmail = createVerificationEmail(user.email, OTP);

    // try {
    //   // sending the OTP
    //   await sendEmail(VerificationEmail);

    // sending response
    return res.status(200).send({ message: success, email: user.email });
    // } catch (err) {
    //   return res.status(503).send({
    //     message: `Unable to send an email to ${user.email}. Please try later.`,
    //   });
    // }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("internalServerError");
  }
};

export { register };
