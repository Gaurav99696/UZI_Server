import crypto from "crypto";
import { updateGameProgressService } from "../servises/game.servise.js";

const getRandomNumber = async (req, res) => {
  try {
    const randomNumber = crypto.randomInt(1, 11);
    res.send({ success: true, number: randomNumber });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error generating number" });
  }
};

const updateGameProgress = async (req, res) => {
  try {
    const { userName } = req.params;
    const updateData = req.body;

    const updatedUser = await updateGameProgressService(userName, updateData);

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export { getRandomNumber, updateGameProgress };
