import express from "express";
import {
  getRandomNumber,
  updateGameProgress,
} from "../controllers/game.controller.js";
const router = express.Router();

router.get("/randomNumber", getRandomNumber);
router.patch("/updateGameProgress/:userName", updateGameProgress);

export default router;
