// require("dotenv").config();
// require('express-async-errors');

// const connectDB = require("./db/connect");
// const express = require("express");
// const cors = require('cors')
// const app = express();
// const mainRouter = require("./routes/user");

// app.use(express.json());

// // app.use(cors())



// const allowedOrigins = [
//   "http://localhost:5173", // Local frontend (dev)
//   "https://city-pulse-ijpl.vercel.app",
//   "https://city-pulse-ijpl-bc6ief1vy-shashwat-dewangans-projects.vercel.app",
//   "https://city-pulse-ijpl-qdq31a6xn-shashwat-dewangans-projects.vercel.app"
//   // Your deployed frontend
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );


// app.use("/api", mainRouter);

// app.use("/uploads", express.static("uploads"));


// const port = process.env.PORT || 3000;

// const start = async () => {

//     try {        
//         await connectDB(process.env.MONGO_URI);
//         app.listen(port, () => {
//             console.log(`Server is listening on port ${port}`);
//         })

//     } catch (error) {
//        console.log(error); 
//     }
// }

// start();

import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import express from "express";
import cors from "cors";
import connectDB from "./db/connect.js";
import mainRouter from "./routes/user.js";

const app = express();
app.use(express.json());

// Define allowed frontend origins
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

// Routes
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
