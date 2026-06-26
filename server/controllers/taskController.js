const { readTasks, saveTasks } = require("../utils/fileHelper");

const getAllTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

const createTask = (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title,
    description: description || "",
    dueDate: dueDate || null,
    completed: false,
    position: tasks.length + 1,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  saveTasks(tasks);

  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description, dueDate } = req.body;

  const tasks = readTasks();

  const taskIndex = tasks.findIndex(
    task => task.id === taskId
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    dueDate
  };

  saveTasks(tasks);

  res.json(tasks[taskIndex]);
};

const toggleTaskStatus = (req, res) => {
  const taskId = Number(req.params.id);

  const tasks = readTasks();

  const taskIndex = tasks.findIndex(
    task => task.id === taskId
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks[taskIndex].completed =
    !tasks[taskIndex].completed;

  saveTasks(tasks);

  res.json(tasks[taskIndex]);
};

const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  const tasks = readTasks();

  const taskExists = tasks.some(
    task => task.id === taskId
  );

  if (!taskExists) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const updatedTasks = tasks.filter(
    task => task.id !== taskId
  );

  saveTasks(updatedTasks);

  res.json({
    message: "Task deleted successfully"
  });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask
};