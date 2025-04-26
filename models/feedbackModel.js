const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    donorName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
