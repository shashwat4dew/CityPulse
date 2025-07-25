

import express from "express";
import multer from "multer";
import {
  login,
  register,
  dashboard,
  getAllUsers,
  uploadImage,
  getUserUploads,
  toggleStatus,
} from "../controllers/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(authMiddleware, getAllUsers);

router
  .route("/upload")
  .post(authMiddleware, upload.single("image"), uploadImage);

router.route("/uploads").get(authMiddleware, getUserUploads);
router.patch("/uploads/:id/status", authMiddleware, toggleStatus);

export default router;
