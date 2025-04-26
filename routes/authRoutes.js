const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddelware");
const multer = require("multer");
const userModel = require("../models/userModel");

const router = express.Router();
const upload = multer();

//routes

router.post("/register", upload.single("profilePicture"), registerController);

// login route
router.post("/login", loginController);

//GET CURRENT USER || GET
router.get("/currentuser", authMiddleware, currentUserController);

module.exports = router;
