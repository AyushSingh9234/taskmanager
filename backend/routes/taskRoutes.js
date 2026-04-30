const admin = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, admin, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find()
    .populate("project")
    .populate("assignedTo");

  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
});

module.exports = router;