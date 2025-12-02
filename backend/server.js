// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load route files
const authRoutes = require("./routes/auth");
const weatherRoutes = require("./routes/weather");

const app = express();
const PORT = 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", authRoutes);
app.use("/api", weatherRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/myWeather")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

