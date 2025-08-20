import React, { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer } from "../reducers/todoreducer.js"

const ToDoContext = createContext()

const ToDoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, (init) => {
        try {
            toDoFromLocal = JSON.parse(localStorage.getItem("todoBatch51"))
            return toDoFromLocal.todos;
            // return toDoFromLocal ? toDoFromLocal : init;
        }
        catch {
            return init;
        }
    })
    useEffect(()=>{
        localStorage.setItem("todoBatch51", JSON.stringify(state))
    },[state])
    return (
        <ToDoContext.Provider value={{ state, dispatch }}>
            {children}
        </ToDoContext.Provider>
    )
}

export { ToDoContext, ToDoProvider } 