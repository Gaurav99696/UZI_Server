import Users from "../models/user.model.js";

const findUserBy = async (prop, value) => Users.findOne({ [prop]: value });

const createUser = async ({ userName, email, password }) =>
  await Users.create({ userName, email, password });

const getOtp = async (email, propose) => {
  const user = await Users.findOne({ email });
  if (!user) false;

  const exist = await OTP.findOne({ email, for: propose });
  if (!exist) false;

  return await OTP.create({ OTP: getOtpCode(), for: propose, email });
};

let getOtpCode = () =>
  Math.floor(Math.random() * (9 * Math.pow(10, 4 - 1))) + Math.pow(10, 4 - 1);

export { findUserBy, createUser, getOtp };
