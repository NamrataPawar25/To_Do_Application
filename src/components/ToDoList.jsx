import React, { useContext } from "react";
import { ToDoContext } from "../context/ToDoContext";

const ToDoList = () => {
  const { state, dispatch } = useContext(ToDoContext);
  const task = state.todos;

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="container">
        <h1 className="mb-4 text-center">Task List</h1>

        {task.length > 0 ? (
          <div className="row g-4">
            {task.map((t, i) => (
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
                        className={`badge ${
                          t.completed ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {t.completed ? "Completed ✅" : "Pending ⏳"}
                      </span>
                    </div>

                    <p className="card-text text-muted">{t.description}</p>

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
