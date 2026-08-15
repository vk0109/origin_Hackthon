const express = require("express");
const router = express.Router();

const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

// Helper function to upsert user profile
async function upsertUserProfile(req) {
  const { name, phone, location, role, emailVerified, authProvider, avatar } = req.body || {};
  const firebaseUid = req.user && req.user.uid;
  const userEmail = (req.user && req.user.email) || (req.body && req.body.email);

  if (!firebaseUid) {
    throw new Error("Missing user UID in authentication token");
  }

  const effectiveEmail = userEmail ? userEmail.trim().toLowerCase() : `${firebaseUid}@resq.user`;
  const effectiveRole = role && ["CITIZEN", "VOLUNTEER"].includes(role) ? role : "CITIZEN";
  const effectiveName = name && name.trim() ? name.trim() : ((req.user && req.user.name) || effectiveEmail.split("@")[0] || "ResQ User");

  // Query by either firebaseUid or email to avoid duplicate index collisions
  let user = await User.findOne({
    $or: [{ firebaseUid }, { email: effectiveEmail }],
  });

  if (user) {
    user.firebaseUid = firebaseUid;
    user.email = effectiveEmail;
    user.name = effectiveName;
    if (phone !== undefined) user.phone = phone || "";
    if (location !== undefined) user.location = location || "";
    if (role && ["CITIZEN", "VOLUNTEER"].includes(role)) user.role = role;
    if (typeof emailVerified === "boolean") user.emailVerified = emailVerified;
    if (authProvider) user.authProvider = authProvider;
    if (avatar) user.avatar = avatar;

    await user.save();
    return { user, isNew: false };
  }

  user = await User.create({
    firebaseUid,
    name: effectiveName,
    email: effectiveEmail,
    phone: phone || "",
    location: location || "",
    role: effectiveRole,
    emailVerified: Boolean(emailVerified),
    authProvider: authProvider || "password",
    avatar: avatar || "",
  });

  return { user, isNew: true };
}

// CREATE / UPDATE USER PROFILE
router.post("/profile", protect, async (req, res) => {
  console.log("POST /api/auth/profile for uid:", req.user ? req.user.uid : "unknown");
  try {
    const { user, isNew } = await upsertUserProfile(req);
    return res.status(isNew ? 201 : 200).json({
      message: isNew ? "Profile created successfully" : "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return res.status(400).json({
      message: error.message || "Unable to save profile",
    });
  }
});

// REGISTER USER IN MONGODB (Call directly after Firebase signup)
router.post("/register", protect, async (req, res) => {
  console.log("POST /api/auth/register for uid:", req.user ? req.user.uid : "unknown");
  try {
    const { user, isNew } = await upsertUserProfile(req);
    return res.status(isNew ? 201 : 200).json({
      message: "User registered in MongoDB successfully",
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(400).json({
      message: error.message || "Failed to register user in MongoDB",
    });
  }
});

// GET CURRENT USER
router.get("/me", protect, async (req, res) => {
  console.log("GET /api/auth/me for uid:", req.user ? req.user.uid : "unknown");
  try {
    const firebaseUid = req.user.uid;
    const userEmail = req.user.email;

    const user = await User.findOne({
      $or: [
        { firebaseUid },
        ...(userEmail ? [{ email: userEmail.toLowerCase() }] : []),
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User profile not found in MongoDB",
      });
    }

    return res.json({ user });
  } catch (error) {
    console.error("ME ERROR:", error);
    return res.status(500).json({
      message: "Server error loading profile",
    });
  }
});

module.exports = router;