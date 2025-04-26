const mongoose = require("mongoose");

const NidSchema = new mongoose.Schema(
  {
    nid_number: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    mother_name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      village: {
        type: String,
        required: true,
      },
      upazila: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      division: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Nid = mongoose.model("Nid", NidSchema);

module.exports = Nid;
