import { useEffect } from "react";
import { useTodoData } from "../../shared/context/todo";

export default function TodoIndexRoute() {
  const { setOpen } = useTodoData();
  useEffect(() => {
    setOpen(false);
  }, []);

  return null;
}
