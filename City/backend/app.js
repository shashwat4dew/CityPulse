


import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

import connectDB from "./db/connect.js";
import mainRouter from "./routes/user.js";

const app = express();
app.use(express.json());

// ✅ Ensure the "uploads" folder exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 'uploads/' folder created.");
}

// ✅ Define allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://city-pulse-ijpl.vercel.app",
  "https://city-pulse-ijpl-bc6ief1vy-shashwat-dewangans-projects.vercel.app",
  "https://city-pulse-ijpl-qdq31a6xn-shashwat-dewangans-projects.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Routes
app.use("/api", mainRouter);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`🚀 Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

start();
