// imports
import express from "express";
import dotenv from "dotenv";
import initRoutes from "./routes/index.js";
import mongoose from "mongoose";

// Initializations
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;
initRoutes(app);

// Database connection
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Connected! YOU ARE CONNECTED TO YOUR DATABASE!");
  })
  .catch(() => console.log("faild! YOU ARE NOT CONNECTED TO YOUR DATABASE!"));
