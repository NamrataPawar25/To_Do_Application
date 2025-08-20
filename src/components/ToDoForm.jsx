import React, { useState } from 'react'
import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext';
import { useNavigate } from 'react-router-dom';

const ToDoForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {dispatch } = useContext(ToDoContext);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: Date.now(),
      name,
      description,
    };

    dispatch({ type: "ADD_TODO", payload: {name, description}});

    setName("");
    setDescription("");

    navigate("/");
    };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="text-center text-primary mb-4">Create Task</h3>
        <div className="container">
          <h4 className="mb-3">Add New Task</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="taskTitle" className="form-label fw-bold">
                Task Title
              </label>
              <input
                type="text"
                className="form-control"
                id="taskTitle"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Task Title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label fw-bold">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="taskDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ToDoForm
