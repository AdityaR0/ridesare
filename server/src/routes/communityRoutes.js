const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getMyCommunity } = require("../controllers/communityController");

const router = express.Router();

router.get("/my", protect, getMyCommunity);

module.exports = router;
