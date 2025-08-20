export const initialState = {
  todos: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      console.log(action.payload);
      const { name, description } = action.payload;
      if (!name?.trim()) return state; // ignore empty names
      const newTodo = {
        id: Date.now(),
        name: name.trim(),
        description: (description || "").trim(),
        isComplete: false,
        
      };
      return { ...state, todos: [newTodo, ...state.todos] };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
        
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    default:
      return state;
  }
  
};
