import React, { useContext, useState } from "react";
import { ToDoContext } from "../context/ToDoContext";
import "../components/ToDoList.css"
const ToDoList = () => {
  const { state, dispatch } = useContext(ToDoContext);
  const task = state.todos;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Tasks");
  const [expanded, setExpanded] = useState({});

  const filteredTasks = task.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    if (filter === "Completed") return t.completed && matchesSearch;
    if (filter === "Pending") return !t.completed && matchesSearch;
    return matchesSearch; // All
  });

  const truncateText = (text, id) => {
    const limit = 50;
    if (expanded[id] || text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <div
      className="container-fluid py-4 todo-bg"
      style={{ minHeight: "100vh" }}
    >
      <div className="container d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            onChange={(e) => setSearch(e.target.value)}
            className="form-control search-input mb-3"
          />
        </div>
        <div className="dropdown mb-3">
          <button
            className="btn btn-primary dropdown-toggle shadow-sm rounded-pill"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {filter}
          </button>
          <ul className="dropdown-menu shadow">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilter("All Tasks")}
              >
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
        <h1 className="mb-4 text-center fw-bold text-white">📋 Task List</h1>

        {filteredTasks.length > 0 ? (
          <div className="row g-4">
            {filteredTasks.map((t, i) => (
              <div className="col-md-4" key={t.id}>
                <div className="card task-card shadow-lg border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold mb-0 text-primary">
                        {i + 1}. {t.name}
                      </h5>
                      <span
                        className={`badge ${
                          t.completed
                            ? "bg-success"
                            : "bg-warning text-dark"
                        } px-3 py-2`}
                        style={{ borderRadius: "12px" }}
                      >
                        {t.completed ? "✅ Completed" : "⏳ Pending"}
                      </span>
                    </div>

                    <p className="card-text text-muted">
                      {truncateText(t.description, t.id)}
                      {t.description.length > 50 && (
                        <span
                          className="read-more"
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
                        className="btn btn-outline-success btn-sm rounded-pill"
                        onClick={() =>
                          dispatch({ type: "TOGGLE_TODO", payload: t.id })
                        }
                      >
                        Toggle
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill"
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
          <p className="text-center text-light">No tasks yet 🚀 Add one!</p>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
