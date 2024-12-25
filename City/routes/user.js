// const express = require("express");
// const router = express.Router();

// const { login, register, dashboard, getAllUsers } = require("../controllers/user");
// const authMiddleware = require('../middleware/auth')

// router.route("/login").post(login);
// router.route("/register").post(register);
// router.route("/dashboard").get(authMiddleware, dashboard);
// router.route("/users").get(getAllUsers);


// module.exports = router;

const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  login,
  register,
  dashboard,
  getAllUsers,
  uploadImage,
  getUserUploads,
  toggleStatus,
} = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the "uploads" folder exists in your project directory
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

// Image upload and fetching routes
router
  .route("/upload")
  .post(authMiddleware, upload.single("image"), uploadImage);

router.route("/uploads").get(authMiddleware, getUserUploads);

router.patch("/uploads/:id/status", authMiddleware, toggleStatus);


module.exports = router;