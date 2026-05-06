const crypto = require("crypto");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

/** Stable 24-hex id when MongoDB is offline so the same email always maps to the same user */
function stableIdFromEmail(email) {
  const hash = crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");
  return new mongoose.Types.ObjectId(hash.slice(0, 24));
}

// POST /api/auth/login
// Simple login — find or create user by email
const loginUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();

    if (connectDB.isMongoAvailable()) {
      try {
        let user = await User.findOne({ email: normalizedEmail });
        if (!user) {
          user = await User.create({ name: trimmedName, email: normalizedEmail });
        } else if (trimmedName && user.name !== trimmedName) {
          user.name = trimmedName;
          await user.save();
        }

        return res.status(200).json({
          _id: String(user._id),
          name: user.name,
          email: user.email,
        });
      } catch (dbErr) {
        console.error("Auth DB error, using offline user:", dbErr.message);
      }
    }

    // MongoDB unavailable or query failed — still allow sign-in (enrollments need DB)
    return res.status(200).json({
      _id: String(stableIdFromEmail(normalizedEmail)),
      name: trimmedName,
      email: normalizedEmail,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginUser };
