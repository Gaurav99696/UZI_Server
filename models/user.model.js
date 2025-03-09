import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 1024,
      required: true,
      unique: true,
    },
    upiId: {
      type: String,
      unique: true,
      sparse: true,
    },
    gameProgress: {
      roundsPlayed: { type: Number, default: 0 },
      matchesPlayed: { type: Number, default: 0 },
      roundsWon: { type: Number, default: 0 },
      roundsLost: { type: Number, default: 0 },
      winAmount: { type: Number, default: 0 },
      amountLost: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
