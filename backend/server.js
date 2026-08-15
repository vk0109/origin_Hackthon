const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const dotenv = require("dotenv");

// dotenv SABSE PEHLE load karo
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


// const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();



// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Disaster Relief Resource Management API is running 🚨",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});