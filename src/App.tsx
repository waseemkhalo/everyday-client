import { User } from "firebase/auth";
import { FormEvent, useState } from "react";
import Login from "./Component/Login/Login";
import NavPostAuth from "./Component/NavPostAuth/NavPostAuth";
import QuoteBox from "./Component/QuoteBox/QuoteBox";
import { auth } from "./firebase/firebase";
import { addList } from "./services/listService";
import { addTodo } from "./services/todoService";

function App() {
  //* for testing user services

  const [user, setUser] = useState<User | null>()

  auth.onAuthStateChanged((authUser) => {
    setUser(authUser)
  })

  const handleNewTodo = async (e: FormEvent, index: number) => {
    e.preventDefault()
    const target = e.target as typeof e.target & { todo: { value: string } }
    await addTodo(index, target.todo.value)
  }

  const handleNewList = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & { title: { value: string } }
    await addList(target.title.value)
  }

  //* end of services testing

  return (
    <div className="App">
      <h1>Everyday TODOs</h1>

      <Login />
      <NavPostAuth />
      <QuoteBox />


      {
        //* testing user services */
        user &&
        <>
          <div className="h-2 bg-black"> </div>
          <span>Signed in as {auth.currentUser?.displayName} </span>
          <a href="/" onClick={() => auth.signOut()}>Sign-out</a>
          <div className="h-2 bg-black"> </div>
          <div className="flex gap-4 p-4">
            <form onSubmit={handleNewList} >
              <input name="title" className="border-b-2" />
              <button>+ list</button>
            </form>
            {/* {user.lists.map((list, index) =>
            <article key={index} className='border-2 rounded p-4' >
              <h3 className="text-lg font-bold underline">{list.title}</h3>
              <form onSubmit={(e) => handleNewTodo(e, index)} >
                <input name="todo" className="border-b-2" />
                <button>+ todo</button>
              </form>
              <ul>
                {list.todos.map((todo, index) =>
                  <li key={index} >{todo.content}</li>
                )}
              </ul>
            </article>
          )} */}
          </div>
        </>
      }
    </div>
  );
}

export default App;
