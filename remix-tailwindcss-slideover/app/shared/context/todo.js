import { createContext, useContext } from "react";

export const TodoDataContext = createContext({
  todo: null,
  setTodo: () => {},
  todos: [],
  setTodos: () => {},
  open: false,
  setOpen: () => {},
});

export const useTodoData = () => useContext(TodoDataContext);
