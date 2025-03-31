import Users from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const findUserBy = async (prop, value) => Users.findOne({ [prop]: value });

const createUser = async ({ userName, email, password, upiId }) => {
  return await Users.create({ userName, email, password, upiId });
};

const getOtp = async (email, propose) => {
  const user = await Users.findOne({ email });
  if (!user) return null;

  const exist = await OTP.findOne({ email, for: propose });
  if (exist) {
    return await OTP.findOneAndUpdate(
      { email, for: propose },
      { OTP: getOtpCode() },
      { new: true }
    );
  }

  return await OTP.create({ OTP: getOtpCode(), for: propose, email });
};

const verifyEmail = async (email, otp, purpose) => {
  const verified = await OTP.findOne({ email, OTP: otp, for: purpose });
  if (!verified) return false;

  if (purpose === "register") {
    const user = await Users.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    const data = {
      email: user.email,
      id: user._id,
    };

    await OTP.findOneAndDelete({ email, OTP: otp, for: purpose });

    return {
      user,
      Authorization: await getToken(data),
    };
  } else {
    return await OTP.findOneAndDelete({ email, OTP: otp, for: purpose });
  }
};

const login = async (email, password) => {
  let data = await Users.findOne({ email, isVerified: true });

  if (!data) return null;

  const comparePassword = await bcrypt.compare(password, data.password);
  console.log(comparePassword);
  console.log(data.password);

  if (!comparePassword) return false;

  const tokenData = {
    email: data.email,
    id: data._id,
  };

  return {
    data,
    Authorization: await getToken(tokenData),
  };
};

const updatePasswordService = async (email, newPassword) => {
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) return new Error("Your old password is same Password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return { message: "Password updated successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getToken = async (body) =>
  jwt.sign(body, process.env.JWT_SCERET || "", {
    expiresIn: process.env.JWT_EXPIRY || "1h",
  });

const getOtpCode = () =>
  Math.floor(Math.random() * (9 * Math.pow(10, 4 - 1))) + Math.pow(10, 4 - 1);

export {
  findUserBy,
  createUser,
  getOtp,
  login,
  verifyEmail,
  updatePasswordService,
};
