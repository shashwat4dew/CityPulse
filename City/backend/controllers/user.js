

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
//     } else {
//       return res.status(400).json({ msg: "Please add all values in the request body" });
//     }
//   } else {
//     return res.status(400).json({ msg: "Email already in use" });
//   }
// };

//new register
const register = async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });

    if (foundUser === null) {
      let { username, email, password, phoneNumber } = req.body;

      if (username && email && password && phoneNumber) {
        const person = new User({
          name: username,
          email,
          password,
          phoneNumber
        });
        await person.save();

        // You can also generate and return JWT token here if needed
        return res.status(201).json({ person });
      } else {
        return res.status(400).json({ msg: "Please add all values" });
      }
    } else {
      return res.status(400).json({ msg: "Email already in use" });
    }
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ msg: "Internal server error", error: error.message });
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

// // Upload image
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

//     // Use backend URL from .env or fallback
//     const baseURL = process.env.BACKEND_URL || "http://localhost:3000";
//     const imageUrl = `${baseURL}/uploads/${req.file.filename}`;

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

//     // ✅ Save only the relative path
//     const imageUrl = `/uploads/${req.file.filename}`;

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
const uploadImage = async (req, res) => {
  try {
    const { description, lat, lng, address } = req.body;

    if (!description || !req.file) {
      return res.status(400).json({ msg: "Image and description are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newUpload = new Upload({
      imageUrl,
      description,
      user: req.user.id,
      location: {
        lat: parseFloat(lat),       // ✅ convert string to number
        lng: parseFloat(lng),
        address: address || ""
      },
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

