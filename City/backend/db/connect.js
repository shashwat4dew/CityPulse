// const mongoose = require("mongoose");

// const connectDB = (url) => {
//   return mongoose.connect(url, {});
// };

// module.exports = connectDB;

// connectDB.js
import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {});
};

export default connectDB;
