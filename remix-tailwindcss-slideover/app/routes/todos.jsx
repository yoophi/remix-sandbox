import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet } from "remix";
import { TodoDataContext } from "~/shared/context/todo";

function TodoLayout() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  return (
    <>
      <TodoDataContext.Provider
        value={{ todo, todos, open, setOpen, setTodo, setTodos }}
      >
        <Outlet />
        <div className="p-4 h-screen overflow-y-auto">
          {todos.map((todo) => (
            <>
              <Link className="p-2" to={`/todos/${todo.id}`}>
                /todos/{todo.id}
              </Link>
              <pre className="bg-gray-200 p-2 mb-2">
                {JSON.stringify(todo, null, 2)}
              </pre>
            </>
          ))}
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden"
            onClose={setOpen}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Dialog.Overlay className="absolute inset-0" />

              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-2xl">
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {todo?.title ? todo.title : "Panel title"}
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              type="button"
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div
                            className="h-full border-2 border-dashed border-gray-200"
                            aria-hidden="true"
                          >
                            <pre>{JSON.stringify(todo, null, 2)}</pre>
                          </div>
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </TodoDataContext.Provider>
    </>
  );
}

export default TodoLayout;
