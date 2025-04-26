const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["admin", "organisation", "donar", "hospital", "patient"],
    },
    name: {
      type: String,
      required: function () {
        return (
          this.role === "admin" ||
          this.role === "donar" ||
          this.role === "patient"
        );
      },
    },
    organisationName: {
      type: String,
      required: function () {
        return this.role === "organisation";
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        return this.role === "hospital";
      },
    },
    nidNumber: {
      type: String,
      required: function () {
        return this.role === "donar";
      },
      unique: function () {
        return this.role === "donar";
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    website: {
      type: String,
      // required: function () {
      //   return this.role === "organisation" || this.role === "hospital";
      // },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: function () {
        return this.role === "donar";
      },
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: function () {
        return this.role === "donar";
      },
    },
    city: {
      type: String,
      required: function () {
        return this.role === "donar";
      },
    },
    profilePicture: {
      type: String,
      required: function () {
        return this.role === "donar";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userModel", userSchema);
