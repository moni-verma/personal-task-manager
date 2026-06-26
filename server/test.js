const {
  readTasks,
  saveTasks
} = require("./utils/fileHelper");

const tasks = [
  {
    id: 1,
    title: "Learn React"
  }
];

saveTasks(tasks);

console.log("Saved");