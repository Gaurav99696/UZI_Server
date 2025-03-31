// imports
import express from "express";
import dotenv from "dotenv";
import initRoutes from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";

// Initializations
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;
app.use(
  cors({
    origin: ["http://localhost:3000", "https://uzi-wrsr.onrender.com"],
    credentials: true,
  })
);

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
  .catch(() =>
    console.log("Connection Faild! YOU ARE NOT CONNECTED TO YOUR DATABASE!")
  );
