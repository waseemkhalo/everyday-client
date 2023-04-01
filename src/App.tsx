import { FormEvent, useState } from "react";
import Login from "./Component/Login/Login";
import NavPostAuth from "./Component/NavPostAuth/NavPostAuth";
import QuoteBox from "./Component/QuoteBox/QuoteBox";
import { auth } from "./firebase/firebase";
import { List, addList, getLists } from "./services/listService";
import { Todo, addTodo } from "./services/todoService";

function App() {
  //* for testing user services

  const [lists, setLists] = useState<List[] | null>()

  auth.onAuthStateChanged(async (authUser) => {
    if (authUser) {
      const userLists = await getLists()
      setLists(userLists)
    }
  })

  const handleNewTodo = async (e: FormEvent<HTMLFormElement>, title: List['title']) => {
    e.preventDefault()
    const target = e.target as typeof e.target & { todo: { value: Todo['content'] } }
    await addTodo(title, target.todo.value);
    (e.target as HTMLFormElement).reset();
  }

  const handleNewList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & { title: { value: List['title'] } }
    await addList(target.title.value);
    (e.target as HTMLFormElement).reset();

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
        lists &&
        <>
          <div className="h-2 bg-black"> </div>
          <span>Signed in as {auth.currentUser?.displayName} </span>
          <a href="/" onClick={() => auth.signOut()}>Sign-out</a>
          <div className="h-2 bg-black"> </div>
          <div className="flex flex-wrap gap-4 p-4">
            <form onSubmit={handleNewList} >
              <input name="title" className="border-b-2" />
              <button>+ list</button>
            </form>
            {lists.sort((a, b) => a.order - b.order).map(({ title, todos }) =>
              <article key={title} className='border-2 rounded p-4' >
                <h3 className="text-lg font-bold underline">{title}</h3>
                <form onSubmit={(e) => handleNewTodo(e, title)} >
                  <input name="todo" className="border-b-2" />
                  <button>+ todo</button>
                </form>
                <ul>
                  {todos.map((todo, index) =>
                    <li key={index} >{todo.content}</li>
                  )}
                </ul>
              </article>
            )}
          </div>
        </>
      }
    </div>
  );
}

export default App;
