import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks on start
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, completed: false }),
    });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  // Styles
  const appStyle = {
    backgroundImage: "url('/todobg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    filter: "brightness(0.9)",
    fontFamily: "'Poppins', Wide Latin",
  };

  const cardStyle = {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "20px",
    padding: "30px 20px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
    
  };

  const inputContainer = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    flex: 1,
  };

  const addButton = {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontFamily: "'Poppins', Arial",
  };

  const deleteButton = {
    marginLeft: "10px",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
    fontFamily: "'Poppins', Arial",
  };

  const taskStyle = (completed) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "8px 10px",
    borderRadius: "8px",
    marginBottom: "10px",
    textDecoration: completed ? "line-through" : "none",
    opacity: completed ? 0.6 : 1,
    fontFamily: "'Poppins', Arial",
  });

  return (
    <div style={appStyle}>
      <div style={cardStyle}>
        <h1>To-Do List</h1>

        <div style={inputContainer}>
          <input
            style={inputStyle}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task"
          />
          <button style={addButton} onClick={addTask}>
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={taskStyle(task.completed)}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id, task.completed)}
                />
                <span>{task.title}</span>
              </div>
              <button
                style={deleteButton}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
