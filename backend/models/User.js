const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      default: "ResQ User",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["CITIZEN", "VOLUNTEER"],
      default: "CITIZEN",
      required: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    authProvider: {
      type: String,
      default: "password",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);