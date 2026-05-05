const User = require("../models/User");

// POST /api/auth/login
// Simple login — find or create user by email
const loginUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Find existing user or create new one
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginUser };
