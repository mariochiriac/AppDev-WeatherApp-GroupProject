// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// NOTE: in a real app this should be in environment variables
const JWT_SECRET = "super-secret-key-change-me";

// --- Helper route: create a test user (use once via Postman) ---
// POST /api/seed-user
router.post("/seed-user", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "email, password, firstName, lastName are required." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: "User created",
      id: user._id,
      email: user.email,
    });
  } catch (err) {
    console.error("Seed user error:", err);
    res.status(500).json({ message: "Error creating user." });
  }
});

// --- Main login route ---
// POST /api/auth   { email, password }
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      lastLoginAt: user.lastLoginAt,
    });
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
