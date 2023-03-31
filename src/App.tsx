import { useState } from "react";
import Login from "./Component/Login/Login";
import NavPostAuth from "./Component/NavPostAuth/NavPostAuth";
import QuoteBox from "./Component/QuoteBox/QuoteBox";
import { auth } from "./firebase/firebase";
import List from "./Component/List/List";
import Footer from "./Component/Footer/Footer";

function App() {
  const [username, setUsername] = useState<string>("");

  //firebase onAuthStateChanged

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUsername(user.displayName!);
      console.log("user signed in");
    } else {
      console.log("user signed out");
    }
  });

  return (
    <div className="App">
      <NavPostAuth />
      <QuoteBox />
      <Login />

      <>
        <div className="h-2 bg-black"> </div>
        <span>Signed in as {username} </span>
        <a href="/" onClick={() => auth.signOut()}>
          Sign-out
        </a>
        <div className="h-2 bg-black"> </div>
      </>

      <List />
      <Footer />
    </div>
  );
}

export default App;
