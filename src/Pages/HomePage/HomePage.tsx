import { useEffect, useState } from "react";
import DayDetails from "../../Component/DayDetails/DayDetails";
import Footer from "../../Component/Footer/Footer";
import Lists from "../../Component/Lists/Lists";
import Login from "../../Component/Login/Login";
import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NoteSection from "../../Component/NoteSection/NoteSection";
import QuoteBox from "../../Component/QuoteBox/QuoteBox";
import StaticLists from "../../Component/StaticLists/StaticLists";
import { auth } from "../../firebase/firebase";
import { Day } from "../../services/dayService";

function HomePage() {

  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(false)
  const [day, setDay] = useState<Day | undefined>(undefined)

  //firebase onAuthStateChanged
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setSignedIn(true)
      setLoading(false)
    });
    return () => unsubscribe();
  }, [])

  return (
    <div className="App">
      {!loading &&
        <>
          <NavPostAuth />
          <QuoteBox oldQuote={day?.quote} />
          {signedIn ? (
            <>
              <div className="h-2 bg-black" />
              <span>Signed in as {auth.currentUser?.displayName} </span>
              <div className="h-2 bg-black" />
              <DayDetails day={day} setDay={setDay} />
              {day ?
                <StaticLists lists={day.lists} />
                :
                <Lists />
              }
              <NoteSection notes={day?.notes} />
            </>
          ) : (
            <Login />
          )}
        </>}
      <Footer />
    </div>
  );
}


export default HomePage