const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// GET all donors
router.get("/", async (req, res) => {
  try {
    const donors = await userModel.find({ role: "donar" });
    console.log(donors);

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
