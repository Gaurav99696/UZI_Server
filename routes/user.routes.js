import express from "express";

import {
  deleteUser,
  emailVerifivcation,
  getProfile,
  getTranx,
  loginUser,
  register,
  updatePassword,
  verifyUser,
} from "../controllers/user.contollers.js";

const router = express.Router();

router.post("/register", register);
router.delete("/deleteUser/:userName", deleteUser);
router.post("/verifyUser", verifyUser);
router.post("/login", loginUser);
router.post("/emailVerification", emailVerifivcation);
router.patch("/forgetPassword", updatePassword);
router.get("/getProfile/:userName", getProfile);
router.get("/getTranx/:userName", getTranx);

export default router;
