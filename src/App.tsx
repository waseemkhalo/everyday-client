import { useState } from "react";
import Login from "./Component/Login/Login";
import NavPostAuth from "./Component/NavPostAuth/NavPostAuth";
import QuoteBox from "./Component/QuoteBox/QuoteBox";
import { auth } from "./firebase/firebase";
import { DbUser, getCurrentUser } from "./services/userService";

function App() {
  //* for testing user services

  const [user, setUser] = useState<DbUser | undefined>()

  auth.onAuthStateChanged(() => {
    const loadUser = async () => {
      if (auth.currentUser) {
        const dbUser = await getCurrentUser()
        setUser(dbUser)
      }
    }
    loadUser()
  })

  //* end of services testing

  return (
    <div className="App">
      <h1>Everyday TODOs</h1>

      <Login />
      <NavPostAuth />
      <QuoteBox />

      <>
        <div className="h-2 bg-black"> </div>
        <span>Signed in as {auth.currentUser?.displayName} </span>
        <a href="/" onClick={() => auth.signOut()}>Sign-out</a>
        <div className="h-2 bg-black"> </div>
      </>

      {
        //* testing user services */
        user &&
        <div className="flex gap-4 p-4">
          {user.lists.map((list, index) =>
            <article key={index} className='border-2 rounded p-4' >
              <h3 className="text-lg font-bold underline">{list.title}</h3>
              <ul>
                {list.todos.map((todo, index) =>
                  <li key={index} >{todo.content}</li>
                )}
              </ul>
            </article>
          )}
        </div>
      }
    </div>
  );
}

export default App;
