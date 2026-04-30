const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const users = await User.find().select("_id name role");
  res.json(users);
});

module.exports = router;