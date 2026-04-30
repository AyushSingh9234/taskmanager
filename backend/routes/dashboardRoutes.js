const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const total = await Task.countDocuments();

    const completed = await Task.countDocuments({
      status: "Completed"
    });

    const pending = await Task.countDocuments({
      status: "Pending"
    });

    const progress = await Task.countDocuments({
      status: "In Progress"
    });

    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" }
    });

    res.json({
      total,
      completed,
      pending,
      progress,
      overdue
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;