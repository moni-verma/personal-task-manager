const express = require("express");

const {
  getAllTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Routes
router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.patch("/:id/toggle", toggleTaskStatus);

router.delete("/:id", deleteTask);

module.exports = router;