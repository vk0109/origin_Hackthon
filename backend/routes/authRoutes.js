const express = require("express");
const router = express.Router();

const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

// CREATE / UPDATE USER PROFILE
router.post("/profile", protect, async (req, res) => {
  console.log('POST /api/auth/profile headers:', req.headers.authorization ? req.headers.authorization.substring(0,60) : '<<no auth header>>');
  console.log('POST /api/auth/profile body:', req.body);
  try {
    const { name, phone, location, role } = req.body;

    const firebaseUid = req.user && req.user.uid;
    const email = req.user && req.user.email;

    if (!name || !role) {
      return res.status(400).json({
        message: "Name and role are required",
      });
    }

    if (!["CITIZEN", "VOLUNTEER"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    let user = await User.findOne({ firebaseUid });

    if (user) {
      user.name = name;
      user.phone = phone || "";
      user.location = location || "";
      user.role = role;
      user.email = email;

      await user.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    }

    user = await User.create({
      firebaseUid,
      name,
      email,
      phone: phone || "",
      location: location || "",
      role,
    });

    return res.status(201).json({
      message: "Profile created successfully",
      user,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// GET CURRENT USER
router.get("/me", protect, async (req, res) => {
  console.log('GET /api/auth/me headers:', req.headers.authorization ? req.headers.authorization.substring(0,60) : '<<no auth header>>');
  try {
    const user = await User.findOne({
      firebaseUid: req.user.uid,
    });

    if (!user) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    return res.json({ user });
  } catch (error) {
    console.error("ME ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;