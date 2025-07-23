// // models/Upload.js
// const mongoose = require("mongoose");

// const uploadSchema = new mongoose.Schema({
//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   status: { type: String, enum: ["pending", "completed"], default: "pending" },
// });

// const Upload = mongoose.model("Upload", uploadSchema);

// module.exports = Upload;


import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
  lat: { type: Number },
  lng: { type: Number },
  address: { type: String },
},

  status: { type: String, enum: ["pending", "completed"], default: "pending" },
}, { timestamps: true });

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;
