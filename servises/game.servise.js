import Users from "../models/user.model.js";

const updateGameProgressService = async (userName, updateData) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { userName },
      { $set: { gameProgress: updateData } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { updateGameProgressService };
