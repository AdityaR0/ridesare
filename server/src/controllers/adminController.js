// src/controllers/adminController.js
const jwt = require("jsonwebtoken");

exports.loginAdmin = (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!process.env.ADMIN_PASSWORD) {
      return res
        .status(500)
        .json({ message: "Admin password is not configured in .env" });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin password" });
    }

    // create a JWT token with role = admin
    const token = jwt.sign(
      {
        role: "admin",
        // we don’t have a real admin user in DB, so just use a constant id
        id: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Admin login successful",
      token,
      role: "admin",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
