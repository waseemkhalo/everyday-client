import React, { FormEvent, useEffect, useState } from "react";
import { addTodo, getTodos, Todo } from "./services/todoService";

function App() {

  //* for testing todo services
  const [newTodo, setNewTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const handleNewTodo = async (e: FormEvent) => {
    e.preventDefault()
    if (newTodo) {
      await addTodo(newTodo)
      setNewTodo('')
      getTodos().then(todos => setTodos(todos))
    }
  }

  useEffect(() => {
    getTodos().then(todos => setTodos(todos))
  }, [])
  //* end of services testing

  return (
    <div className="App">
      <h1>Everyday TODOs</h1>

      {//* testing todo services */
        <>
          <form onSubmit={handleNewTodo} >
            <label>
              <p>add new Todo</p>
              <input type="text" placeholder="new todo" value={newTodo}
                onChange={(e: FormEvent<HTMLInputElement>) => setNewTodo(e.currentTarget.value)}
              />
              <button>add</button>
            </label>
          </form>
          <ul>
            {todos.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
              .map(todo =>
                <li key={todo.id} >
                  {todo.content}
                </li>
              )
            }
          </ul>
        </>
      }


    </div>
  );
}

export default App;
