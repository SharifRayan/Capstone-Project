const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

// Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedbacks", error });
  }
});

// Submit feedback
router.post("/feedback-post", async (req, res) => {
  const { patientName, donorName, description } = req.body;

  try {
    const feedback = new Feedback({ patientName, donorName, description });
    await feedback.save();
    res
      .status(201)
      .json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit feedback", error });
  }
});

// Get donors for selection
router.get("/donors-name", async (req, res) => {
  try {
    const donors = await User.find({ role: "donar" }).select("name");
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donors", error });
  }
});

module.exports = router;
