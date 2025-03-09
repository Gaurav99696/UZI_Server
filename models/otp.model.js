import mongoose from "mongoose";

const OTPSchema = mongoose.Schema(
  {
    OTP: {
      type: String,
      required: true,
    },
    for: {
      type: String,
      enum: ["register", "forgotPassword"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: new Date(),
      expires: 600,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
