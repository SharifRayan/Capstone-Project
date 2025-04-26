const userModel = require("../models/userModel");
const Nid = require("../models/nidModel"); // Import the NID model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig"); // Import Cloudinary configuration

// Multer configuration for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Register controller
const registerController = async (req, res) => {
  try {
    // Check if the user already exists by email
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // If the user is registering as a donor, validate NID number, name, gender, blood group, and city
    if (req.body.role === "donar") {
      const { nidNumber, name, gender, bloodGroup, city } = req.body;

      // Check for required donor fields
      if (!gender || !bloodGroup || !city) {
        console.log("Request Body:", req.body);
        console.log("Missing required donor fields:", {
          gender,
          bloodGroup,
          city,
        });

        return res.status(400).send({
          success: false,
          message: "Gender, blood group, and city are required for donors",
        });
      }

      // Validate gender, blood group, and city input
      const validGenders = ["male", "female", "other"];
      const validBloodGroups = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ];

      if (!validGenders.includes(gender)) {
        console.log("Invalid gender selected:", gender);
        return res.status(400).send({
          success: false,
          message: "Invalid gender selection",
        });
      }

      if (!validBloodGroups.includes(bloodGroup)) {
        console.log("Invalid blood group selected:", bloodGroup);
        return res.status(400).send({
          success: false,
          message: "Invalid blood group selection",
        });
      }

      // Validate NID number and name against the NID database
      const nidRecord = await Nid.findOne({ nid_number: nidNumber });

      // If NID record is not found
      if (!nidRecord) {
        console.log("NID number not found in the database:", nidNumber);
        return res.status(400).send({
          success: false,
          message: "NID number not found in the NID database",
        });
      }

      // If the full name does not match the NID record
      if (nidRecord.full_name !== name) {
        console.log("Full name mismatch for NID:", {
          nidRecordName: nidRecord.full_name,
          providedName: name,
        });
        return res.status(400).send({
          success: false,
          message: "Full name does not match the NID record",
        });
      }

      // Upload profile picture if provided
      let profilePictureUrl = "";
      if (req.file) {
        console.log("Uploading profile picture...");
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "image", folder: "profile_pictures" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(req.file.buffer);
        });
        profilePictureUrl = result.secure_url;
        console.log(
          "Profile picture uploaded successfully:",
          result.secure_url
        );
      }

      // Add profile picture URL to request body
      req.body.profilePicture = profilePictureUrl;
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Create and save the new user
    const user = new userModel(req.body);
    await user.save();
    console.log("User registered successfully:", user);

    // Return success response
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error in register API:", error);
    return res.status(500).send({
      message: "Error in register API",
      error,
    });
  }
};

// Login controller
const loginController = async (req, res) => {
  try {
    // Find the user by email
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user role matches the provided role
    if (user.role !== req.body.role) {
      return res.status(400).send({
        success: false,
        message: "Role doesn't match",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return success response with the token
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in login API:", error);
    return res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

// Get current user controller
const currentUserController = async (req, res) => {
  try {
    // Find the user by ID
    const user = await userModel.findOne({ _id: req.body.userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Return success response with user information
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error in getting current user:", error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
