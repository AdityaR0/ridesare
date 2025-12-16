const User = require("../models/User");

// GET my community members
exports.getMyCommunity = async (req, res) => {
  try {
    const user = req.user;

    if (!user.community) {
      return res.json({ community: null, members: [] });
    }

    const members = await User.find({
      community: user.community,
    }).select("name role vehicles workingAt");

    res.json({
      community: user.community,
      members,
    });
  } catch (err) {
    res.status(500).json({ message: "Community fetch failed" });
  }
};
