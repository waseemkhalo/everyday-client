import React, { FormEvent, useEffect, useRef, useState } from "react";
import NavModal from "./Component/NavModal/NavModal";
import NavPostAuth from "./Component/NavPostAuth/NavPostAuth";
import QuoteBox from "./Component/QuoteBox/QuoteBox";
import Login from "./Component/Login/Login";
import {
  addTodo,
  checkTodo,
  editTodo,
  getTodos,
  removeTodo,
  Todo,
  uncheckTodo,
} from "./services/todoService";
import { auth } from "./firebase/firebase";

function App() {
  //* for testing todo services
  const [newTodo, setNewTodo] = useState<Todo["content"]>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [edit, setEdit] = useState<Todo["id"]>("");
  const editRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>("");

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
  //* end of services testing


  //firebase onAuthStateChanged

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUsername(user.displayName!)
      console.log("user signed in");
    } else {
      console.log("user signed out");
    }
  });

  return (
    <div className="App">
      <h1>Everyday TODOs</h1>

      <Login />
      <NavPostAuth />
      <QuoteBox />

      <>
        <div className="h-2 bg-black"> </div>
        <span>Signed in as {username} </span>
        <a href="/" onClick={() => auth.signOut()}>Sign-out</a>
        <div className="h-2 bg-black"> </div>
      </>

      {
        //* testing todo services */
        <>
          <form onSubmit={handleNewTodo}>
            <label>
              <p>add new Todo</p>
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
          <ul>
            {todos
              .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
              .map((todo) =>
                edit === todo.id ? (
                  <li key={todo.id} className="flex justify-between w-1/2">
                    <input
                      defaultValue={todo.content}
                      ref={editRef}
                      autoFocus
                    />
                    <div className="flex gap-4">
                      <button onClick={handleConfirmEdit}>confirm</button>
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
                      <button onClick={() => setEdit(todo.id)}>edit</button>
                      <button onClick={() => handleDelete(todo.id)}>
                        delete
                      </button>
                    </div>
                  </li>
                )
              )}
          </ul>
        </>
      }
    </div>
  );
}

export default App;
