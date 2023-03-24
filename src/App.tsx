import React, { FormEvent, useEffect, useRef, useState } from "react";
import NavModal from "./Component/NavModal/NavModal";
import NavPostAuth from "./Component/NavPostAuth/NavPostAuth";
import { addTodo, editTodo, getTodos, Todo } from "./services/todoService";

function App() {

  //* for testing todo services
  const [newTodo, setNewTodo] = useState<Todo['content']>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [edit, setEdit] = useState<Todo['id']>('')
  const editRef = useRef<HTMLInputElement>(null)

  //quick render todos
  const updateTodos = () => getTodos().then(todos => setTodos(todos))

  const handleNewTodo = async (e: FormEvent) => {
    e.preventDefault()
    if (newTodo) {
      await addTodo(newTodo)
      updateTodos()
      setNewTodo('')
    }
  }

  const handleConfirmEdit = async () => {
    if (editRef.current && editRef.current.value && edit) {
      await editTodo(edit, editRef.current.value)
      await updateTodos()
      setEdit('')
    } else console.log('edited todo cannot be blank');
  }

  useEffect(() => {
    updateTodos()
  }, [])
  //* end of services testing

  return (
    <div className="App">
      <h1>Everyday TODOs</h1>

      <NavPostAuth />

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
              .map(todo => (
                edit === todo.id ?
                  <li key={todo.id} className='flex justify-between w-1/2' >
                    <input defaultValue={todo.content} ref={editRef} autoFocus />
                    <div className="flex gap-4">
                      <button onClick={handleConfirmEdit} >confirm</button>
                      <button onClick={() => setEdit('')} >cancel</button>
                    </div>
                  </li>
                  :
                  <li key={todo.id} className='flex justify-between w-1/2' >
                    {todo.content}
                    <div className="flex gap-4">
                      <button onClick={() => setEdit(todo.id)} >edit</button>
                      <button >delete</button>
                    </div>
                  </li>
              )
              )
            }
          </ul>
        </>
      }


    </div>
  );
}

export default App;
