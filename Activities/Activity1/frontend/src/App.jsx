import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


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

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTitle("");
  };

  const saveEdit = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editedTitle }),
    });
    setEditingId(null);
    setEditedTitle("");
    fetchTasks();
  };


  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Styles
const appStyle = {
  backgroundImage: "url('/todobg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", 
  fontFamily: "'Poppins', sans-serif",
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
    flexWrap: "wrap",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    flex: 1,
  };

  const button = {
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  };

  const addButton = {
    ...button,
    backgroundColor: "#007bff",
    color: "white",
  };

  const deleteButton = {
    ...button,
    backgroundColor: "#dc3545",
    color: "white",
  };

  const editButton = {
    ...button,
    backgroundColor: "#ffc107",
    color: "black",
  };

  const saveButton = {
    ...button,
    backgroundColor: "#28a745",
    color: "white",
  };

  const cancelButton = {
    ...button,
    backgroundColor: "#6c757d",
    color: "white",
  };

  const searchBarStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const searchInput = {
    ...inputStyle,
    width: "80%",
    maxWidth: "300px",
    textAlign: "center",
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
  });

  return (
    <div style={appStyle}>
      <div style={cardStyle}>
        <h1>To-Do List</h1>

      
        <div style={searchBarStyle}>
          <input
            type="text"
            style={searchInput}
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      
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
          {filteredTasks.map((task) => (
            <li key={task.id} style={taskStyle(task.completed)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flex: 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id, task.completed)}
                />
                {editingId === task.id ? (
                  <input
                    style={{
                      ...inputStyle,
                      flex: 1,
                      marginRight: "10px",
                      fontSize: "14px",
                    }}
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  <span>{task.title}</span>
                )}
              </div>

              {editingId === task.id ? (
                <>
                  <button style={saveButton} onClick={() => saveEdit(task.id)}>
                    Save
                  </button>
                  <button style={cancelButton} onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button style={editButton} onClick={() => startEdit(task)}>
                    Edit
                  </button>
                  <button
                    style={deleteButton}
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
