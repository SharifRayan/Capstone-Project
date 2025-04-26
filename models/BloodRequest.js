// models/BloodRequest.js
const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Adjust as per your blood type classifications
    },
    quantity: {
      type: Number,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ["Urgent", "Within 24 hours", "Within a week"], // Example urgency levels
    },
    contactInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
