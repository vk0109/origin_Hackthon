const { adminAuth } = require("../config/firebaseAdmin");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log('Auth header:', authHeader ? authHeader.substring(0,50) : '<<missing>>');

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split("Bearer ")[1];

    const decodedToken = await adminAuth.verifyIdToken(token);

    req.user = decodedToken;

    console.log('Firebase token verified for uid:', decodedToken.uid);

    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error && error.message ? error.message : error);

    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};

module.exports = protect;