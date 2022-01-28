import { useLoaderData } from "remix";
import React, { useEffect } from "react";
import { useTodoData } from "~/shared/context/todo";
import axios from "axios";

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    const resp = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return resp.data;
  } catch (err) {
    return null;
  }
};

const TodoDetailRoute = () => {
  const { setOpen, setTodo } = useTodoData();
  const todo = useLoaderData();

  useEffect(() => {
    setTodo(todo);
    setOpen(true);
  }, [todo]);

  return null;
};

export default TodoDetailRoute;
