import { useEffect, useState } from "react";
import Footer from "../../Component/Footer/Footer";
import List from "../../Component/List/List";
import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NoteSection from "../../Component/NoteSection/NoteSection";
import QuoteBox from "../../Component/QuoteBox/QuoteBox";
import { auth } from "../../firebase/firebase";
import { List as DBList } from '../../services/listService';

function HomePage() {

  const [lists, setLists] = useState<DBList[]>()

  //firebase onAuthStateChanged
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async () => {
  //     const lists = await getLists()
  //     setLists(lists)
  //   });
  //   return () => unsubscribe();
  // }, [])
  
  return (
    <div className="App">
    <NavPostAuth />
    <QuoteBox />

    <div className="h-2 bg-black"> </div>
    <span>Signed in as {auth.currentUser?.displayName} </span>
    <a href="/" onClick={() => auth.signOut()}>
      Sign-out
    </a>
    <div className="h-2 bg-black"> </div>
    {lists &&
      <ul className="flex flex-wrap gap-2 ">
        {lists.sort((a, b) => a.order - b.order).map((list) =>
          <List list={list} key={list.title} />
        )}
      </ul>
    }
    <NoteSection />
    <Footer />
  </div>
  )
}

export default HomePage