import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import Navbar from "../components/Navbar";
import {
  getTasks,
  deleteTask,
  updateTask,
  toggleTask,
} from "../services/taskService";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate);
  };

  // UPDATE
  const handleUpdate = async () => {
    await updateTask(editingId, {
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate,
    });

    setEditingId(null);
    fetchTasks();
  };

  // TOGGLE STATUS
  const handleToggle = async (id) => {
    await toggleTask(id);
    fetchTasks();
  };

 return (
  <div>
    <Navbar />

    <div className="page">
      <h1 className="title">My Tasks</h1>

      <AddTask onTaskAdded={fetchTasks} />

      <div className="grid">
        {tasks.map((task) => (
          <div className="card" key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />

                <button className="saveBtn" onClick={handleUpdate}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.dueDate}</p>

                <span
                  className={task.completed ? "done" : "pending"}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>

                <div className="btnRow">
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleToggle(task.id)}>
                    Toggle
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default Home;