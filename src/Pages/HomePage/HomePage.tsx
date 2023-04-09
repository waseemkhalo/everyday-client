import { useEffect, useState } from "react";
import Footer from "../../Component/Footer/Footer";
import Lists from "../../Component/Lists/Lists";
import Login from "../../Component/Login/Login";
import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NoteSection from "../../Component/NoteSection/NoteSection";
import QuoteBox from "../../Component/QuoteBox/QuoteBox";
import { auth } from "../../firebase/firebase";

function HomePage() {


    const [loading, setLoading] = useState(true)
    const [signedIn, setSignedIn] = useState(false)
  
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
            <QuoteBox />
            {signedIn ? (
              <>
                <div className="h-2 bg-black" />
                <span>Signed in as {auth.currentUser?.displayName} </span>

                <div className="h-2 bg-black" />
                <Lists />
                <NoteSection />
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