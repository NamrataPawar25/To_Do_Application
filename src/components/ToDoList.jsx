import React, { useContext, useState } from "react";
import { ToDoContext } from "../context/ToDoContext";

const ToDoList = () => {
  const { state, dispatch } = useContext(ToDoContext);
  const task = state.todos;

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All Tasks");
  const [expanded, setExpanded] = useState({}); // track expanded descriptions

 

  const filteredTasks = task.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    if (filter === "Completed") return t.completed && matchesSearch;
    if (filter === "Pending") return !t.completed && matchesSearch;
    return matchesSearch; // All
  });
  // Helper to show truncated text
  const truncateText = (text, id) => {
    const limit = 50; // characters limit
    if (expanded[id] || text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container d-flex justify-content-between">
        <div>
          <input type="text" placeholder="Search tasks..." onChange={(e) => setSearch(e.target.value)} className="form_control mb-3" />
        </div>
        <div className="dropdown mb-3">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {filter}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={() => setFilter("All Tasks")}>
                All
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilter("Completed")}
              >
                Completed
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilter("Pending")}
              >
                Pending
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <h1 className="mb-4 text-center">Task List</h1>

        {filteredTasks.length > 0 ? (
          <div className="row g-4">
            {filteredTasks.map((t, i) => (
              <div className="col-md-4" key={t.id}>
                <div
                  className="card shadow-lg border-0 h-100"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold mb-0">
                        {i + 1}. {t.name}
                      </h5>
                      {/* Status Badge */}
                      <span
                        className={`badge ${t.completed ? "bg-success" : "bg-warning text-dark"
                          }`}
                      >
                        {t.completed ? "Completed ✅" : "Pending ⏳"}
                      </span>
                    </div>

                    <p className="card-text">
                    {t.description}
                    {truncateText(t.description, t.id)}
                    {t.description.length > 50 && (
                      <span
                        style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
                        onClick={() =>
                          setExpanded((prev) => ({
                            ...prev,
                            [t.id]: !prev[t.id],
                          }))
                        }
                      >
                        {expanded[t.id] ? " Show less" : " Read more"}
                      </span>
                    )} 
                    </p>

                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          dispatch({ type: "TOGGLE_TODO", payload: t.id })
                        }
                      >
                        Toggle
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          dispatch({ type: "DELETE_TODO", payload: t.id })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No tasks yet. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
