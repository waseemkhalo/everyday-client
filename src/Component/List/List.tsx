import editIcon from "../../assets/icons/pencil-light.svg";
import trashIcon from "../../assets/icons/trash-light.svg";
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
      <div className="bg-smoke rounded-md justify-center align-middle px-6 py-2">
        <p className="text-center">Daily list</p>
        <ul className="">
          {todos.map((todo) =>
            edit === todo.id ? (
              <li key={todo.id} className="">
                <input defaultValue={todo.content} ref={editRef} autoFocus />
                <div className="flex gap-4">
                  <button className="" onClick={handleConfirmEdit}>
                    Confirm
                  </button>
                  <button onClick={() => setEdit("")}>Cancel</button>
                </div>
              </li>
            ) : (
              <li key={todo.id} className="flex max-w-full mb-3">
                <input
                  type="checkbox"
                  className="form-checkbox accent-pink-500 mr-2 "
                  checked={todo.completed}
                  onChange={() => handleCheck(todo.id)}
                />
                <div className="flex gap-24">
                  <span>{todo.content}</span>

                  <div className="flex gap-2">
                    <button className="" onClick={() => setEdit(todo.id)}>
                      <img src={editIcon} className="w-5 "></img>
                    </button>
                    <button onClick={() => handleDelete(todo.id)}>
                      <img src={trashIcon} className="w-5"></img>
                    </button>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        <form onSubmit={handleNewTodo}>
          <label>
            <input
              className="bg-transparent border-b-2 border-black focus:outline-none"
              type="text"
              placeholder="Add Item"
              value={newTodo}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setNewTodo(e.currentTarget.value)
              }
            />
            <button className="justify-self-end">+</button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default List;
