const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5175", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

// Simple request logger to help debug the auth flow
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "ResQ Backend is running",
  });
});

app.use("/api/auth", authRoutes);

// Fallback for unknown API routes - return JSON instead of default HTML
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  next();
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ResQ Backend running on port ${PORT}`);
});