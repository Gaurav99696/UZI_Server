import { validateRegisterInput } from "../validations/user.validation.js";
import {
  findUserBy,
  createUser,
  getOtp,
  login,
  verifyEmail,
  updatePasswordService,
  deleteOne,
} from "../servises/user.servise.js";
import {
  createVerificationEmail,
  sendMail,
} from "../servises/email.servise.js";
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
    const VerificationEmail = createVerificationEmail(user.email, OTP);

    try {
      // sending the OTP
      await sendMail(VerificationEmail);
      console.log("hello");

      // sending response
      return await res
        .status(200)
        .send({ message: "success", email: user.email });
    } catch (err) {
      return res.status(503).send({
        message: `Unable to send an email to ${user.email}. Please try later.`,
      });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("internalServerError");
  }
};

// Varify user
const verifyUser = async (req, res) => {
  const data = req.body;

  try {
    const verified = await verifyEmail(data.email, data.OTP, data.purpose);
    if (!verified)
      return res.status(400).send({ message: "Invalid OTP or Email!" });

    return res.status(200).send({ message: "Success", verified });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

// Loging the user
const loginUser = async (req, res) => {
  const data = req.body;

  try {
    const isLogin = await login(data.email, data.password);
    console.log(isLogin);

    if (!isLogin)
      return res.status(400).send({ message: "Invalid email or password" });

    return res.status(200).send({ message: "Success", isLogin });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

// Email Verifiction for updating password
const emailVerifivcation = async (req, res) => {
  const { email } = req.body;

  const user = await findUserBy("email", email);
  if (!user) {
    return res.status(400).send({ message: "Email not registerd !!" });
  }

  const OTP = await getOtp(user.email, "forgotPassword");
  if (!OTP) {
    return res.status(400).send({ message: "errorGeneratingOTP" });
  }

  const VerificationEmail = createVerificationEmail(user.email, OTP);

  try {
    // sending the OTP
    await sendMail(VerificationEmail);
    console.log("hello");

    // sending response
    return res.status(200).send({ message: success, email: user.email });
  } catch (err) {
    return res.status(503).send({
      message: `Unable to send an email to ${user.email}. Please try later.`,
    });
  }
};

// Update password
const updatePassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    if (!newPassword) {
      return res.status(400).send({ message: "Password is required" });
    }

    const response = await updatePasswordService(email, newPassword);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// Get the user Profile
const getProfile = async (req, res) => {
  const data = req.params;

  try {
    const getProfile = await findUserBy("userName", data.userName);
    if (!getProfile)
      return res.status(404).send({ message: "Profile not found" });

    return res.status(200).send({ message: "Success", getProfile });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

// deleting a user
const deleteUser = async (req, res) => {
  const data = req.params;
  try {
    const deleted = await deleteOne(data.userName);
    if (!deleteOne)
      return res.status(400).send({ message: "Cannot delelte !!" });

    return res.status(200).send({ message: "Success" });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

// Get the user Tranx Details
const getTranx = async (req, res) => {
  const { userName } = req.params;

  try {
    const getUser = await findUserBy("userName", userName);

    if (!getUser) return res.status(404).send({ message: "Profile not found" });

    return res.status(200).send({
      message: "Success",
      tranxHistory: getUser.tranxHistory,
    });
  } catch (error) {
    return res.status(500).send({ message: "An unexpected error occurred" });
  }
};

export {
  register,
  getProfile,
  getTranx,
  loginUser,
  verifyUser,
  updatePassword,
  emailVerifivcation,
  deleteUser,
};
