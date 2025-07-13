// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // const login = async (req, res) => {
// //   const { email, password } = req.body;

// //   if (!email || !password) {
// //     return res.status(400).json({
// //       msg: "Bad request. Please add email and password in the request body",
// //     });
// //   }

// //   let foundUser = await User.findOne({ email: req.body.email });
// //   if (foundUser) {
// //     const isMatch = await foundUser.comparePassword(password);

// //     if (isMatch) {
// //       const token = jwt.sign(
// //         { id: foundUser._id, name: foundUser.name },
// //         process.env.JWT_SECRET,
// //         {
// //           expiresIn: "30d",
// //         }
// //       );

// //       return res.status(200).json({ msg: "user logged in", token });
// //     } else {
// //       return res.status(400).json({ msg: "Bad password" });
// //     }
// //   } else {
// //     return res.status(400).json({ msg: "Bad credentails" });
// //   }
// // };
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       msg: "Bad request. Please add email and password in the request body",
//     });
//   }

//   let foundUser = await User.findOne({ email: req.body.email });
//   if (foundUser) {
//     const isMatch = await foundUser.comparePassword(password);

//     if (isMatch) {
//       const token = jwt.sign(
//         { id: foundUser._id, name: foundUser.name },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "30d",
//         }
//       );

//       return res.status(200).json({ msg: "user logged in", token });
//     } else {
//       return res.status(400).json({ msg: "Bad password" });
//     }
//   } else {
//     return res.status(400).json({ msg: "Bad credentials" });
//   }
// };


// const dashboard = async (req, res) => {
//   const luckyNumber = Math.floor(Math.random() * 100);

//   res.status(200).json({
//     msg: `Hello, ${req.user.name}`,
//     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//   });
// };

// const getAllUsers = async (req, res) => {
//   let users = await User.find({});

//   return res.status(200).json({ users });
// };

// const register = async (req, res) => {
//   let foundUser = await User.findOne({ email: req.body.email });
//   if (foundUser === null) {
//     let { username, email, password } = req.body;
//     if (username.length && email.length && password.length) {
//       const person = new User({
//         name: username,
//         email: email,
//         password: password,
//       });
//       await person.save();
//       return res.status(201).json({ person });
//     }else{
//         return res.status(400).json({msg: "Please add all values in the request body"});
//     }
//   } else {
//     return res.status(400).json({ msg: "Email already in use" });
//   }
// };
// //Added uploaded image function
// // const uploadImage = async (req, res) => {
// //   try {
// //     const { description } = req.body;

// //     if (!description || !req.file) {
// //       return res.status(400).json({ msg: "Image and description are required" });
// //     }

// //     const user = await User.findById(req.user.id); // `req.user` is populated by `authMiddleware`
// //     if (!user) {
// //       return res.status(404).json({ msg: "User not found" });
// //     }

// //     user.uploads.push({
// //       imageUrl: `http://localhost:3000/uploads/${req.file.filename}`,
// //       description,
// //     });

// //     await user.save();

// //     res.status(200).json({
// //       msg: "Image uploaded successfully",
// //       uploads: user.uploads,
// //     });
// //   } catch (err) {
// //     console.error("Error uploading image:", err);
// //     res.status(500).json({ msg: "Internal server error" });
// //   }
// // };

// const Upload = require("../models/Upload");
// const uploadImage = async (req, res) => {
//   try {
//     const { description } = req.body;

//     if (!description || !req.file) {
//       return res.status(400).json({ msg: "Image and description are required" });
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }
// //here
// const baseURL = import.meta.env.VITE_BACKEND_URL;
//     const imageUrl = `${baseURL}/uploads/${req.file.filename}`;
//     console.log("Saved Image URL:", req.file.filename); // Add this line

//     // Create a new upload entry
//     const newUpload = new Upload({
//       imageUrl,
//       description,
//       user: req.user.id,
//     });

//     await newUpload.save();

//     res.status(200).json({
//       msg: "Image uploaded successfully",
//       upload: newUpload,
//     });
//   } catch (err) {
//     console.error("Error uploading image:", err);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };






// //Get User Images
// // const getUserUploads = async (req, res) => {
// //   try {
// //     const user = await User.find();
// //     if (!user) {
// //       return res.status(404).json({ msg: "User not found" });
// //     }

// //     res.status(200).json({ uploads });
// //   } catch (err) {
// //     console.error("Error fetching uploads:", err);
// //     res.status(500).json({ msg: "Internal server error" });
// //   }
// // };

// const getUserUploads = async (req, res) => {
//   try {
//     // Fetch all uploads
//     const uploads = await Upload.find()
//       .populate("user", "name email") // Populate user details like name and email
//       .exec();

//     if (!uploads || uploads.length === 0) {
//       return res.status(404).json({ msg: "No uploads found" });
//     }

//     res.status(200).json({ uploads });
//   } catch (err) {
//     console.error("Error fetching uploads:", err);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };

// //for admindashboard
// const toggleStatus = async (req, res) => {
//   try {
//     const { id } = req.params; // Upload ID
//     const upload = await Upload.findById(id);

//     if (!upload) {
//       return res.status(404).json({ msg: "Upload not found" });
//     }

//     // Toggle status
//     upload.status = upload.status === "pending" ? "completed" : "pending";
//     await upload.save();

//     res.status(200).json({ msg: "Status updated", upload });
//   } catch (err) {
//     console.error("Error toggling status:", err);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };



// module.exports = {
//   login,
//   register,
//   dashboard,
//   getAllUsers,
//   uploadImage,
//   getUserUploads,
//   toggleStatus,
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Upload from "../models/Upload.js";

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentials" });
  }
};

// Register function
const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return res.status(400).json({ msg: "Please add all values in the request body" });
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

// Dashboard function
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

// Get all users
const getAllUsers = async (req, res) => {
  let users = await User.find({});
  return res.status(200).json({ users });
};

// Upload image
const uploadImage = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || !req.file) {
      return res.status(400).json({ msg: "Image and description are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Use backend URL from .env or fallback
    const baseURL = process.env.BACKEND_URL || "http://localhost:3000";
    const imageUrl = `${baseURL}/uploads/${req.file.filename}`;

    const newUpload = new Upload({
      imageUrl,
      description,
      user: req.user.id,
    });

    await newUpload.save();

    res.status(200).json({
      msg: "Image uploaded successfully",
      upload: newUpload,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get user uploads
const getUserUploads = async (req, res) => {
  try {
    const uploads = await Upload.find()
      .populate("user", "name email")
      .exec();

    if (!uploads || uploads.length === 0) {
      return res.status(404).json({ msg: "No uploads found" });
    }

    res.status(200).json({ uploads });
  } catch (err) {
    console.error("Error fetching uploads:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Toggle status (admin)
const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await Upload.findById(id);

    if (!upload) {
      return res.status(404).json({ msg: "Upload not found" });
    }

    upload.status = upload.status === "pending" ? "completed" : "pending";
    await upload.save();

    res.status(200).json({ msg: "Status updated", upload });
  } catch (err) {
    console.error("Error toggling status:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Export all functions
export {
  login,
  register,
  dashboard,
  getAllUsers,
  uploadImage,
  getUserUploads,
  toggleStatus,
};

