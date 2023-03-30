import asd from "../../assets/icons/pencil-light.svg";
import {
  addTodo,
  checkTodo,
  editTodo,
  getTodos,
  removeTodo,
  Todo,
  uncheckTodo,
} from "../../services/todoService";

import { FormEvent, useEffect, useRef, useState } from "react";

function List() {
  //* for testing todo services
  const [newTodo, setNewTodo] = useState<Todo["content"]>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [edit, setEdit] = useState<Todo["id"]>("");
  const editRef = useRef<HTMLInputElement>(null);

  //quick render todos
  const updateTodos = () => getTodos().then((todos) => setTodos(todos));

  const handleNewTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (newTodo) {
      await addTodo(newTodo);
      updateTodos();
      setNewTodo("");
    }
  };

  const handleConfirmEdit = async () => {
    if (editRef.current && editRef.current.value && edit) {
      await editTodo(edit, editRef.current.value);
      await updateTodos();
      setEdit("");
    } else console.log("edited todo cannot be blank");
  };

  const handleCheck = async (id: Todo["id"]) => {
    if (todos.find((todo) => todo.id === id)?.completed) {
      await uncheckTodo(id);
    } else {
      await checkTodo(id);
    }
    updateTodos();
  };

  const handleDelete = async (id: Todo["id"]) => {
    await removeTodo(id);
    updateTodos();
  };

  useEffect(() => {
    updateTodos();
  }, []);

  return (
    //* testing todo services */
    <div className="m-8">
      <div className="bg-smoke rounded-md justify-center align-middle">
        <span>Daily list</span>
        <ul className="">
          {todos.map((todo) =>
            edit === todo.id ? (
              <li key={todo.id} className="">
                <input defaultValue={todo.content} ref={editRef} autoFocus />
                <div className="flex gap-4">
                  <button className="" onClick={handleConfirmEdit}>
                    confirm
                  </button>
                  <button onClick={() => setEdit("")}>cancel</button>
                </div>
              </li>
            ) : (
              <li key={todo.id} className="flex justify-between w-1/2">
                <span
                  className={
                    todo.completed ? "line-through" : "hover:line-through"
                  }
                  onClick={() => handleCheck(todo.id)}
                >
                  {todo.content}
                </span>
                <div className="flex gap-4">
                  <button onClick={() => setEdit(todo.id)}>
                    <img src={asd} className="w-10"></img>
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>delete</button>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <form onSubmit={handleNewTodo}>
        <label>
          <input
            type="text"
            placeholder="new todo"
            value={newTodo}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setNewTodo(e.currentTarget.value)
            }
          />
          <button>add</button>
        </label>
      </form>
    </div>
  );
}

export default List;
