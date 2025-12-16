const express = require("express");
const router = express.Router();

const {
  completeDriverProfile,
  updateDriverProfile,
  addOrUpdateVehicle,
} = require("../controllers/driverController");

const { protect } = require("../middleware/authMiddleware");

// 🔹 Existing (DO NOT REMOVE)
router.post("/complete-profile", protect, completeDriverProfile);

// 🔹 NEW: Driver personal update
router.put("/profile", protect, updateDriverProfile);

// 🔹 NEW: Driver vehicle update
router.post("/vehicle", protect, addOrUpdateVehicle);

module.exports = router;
