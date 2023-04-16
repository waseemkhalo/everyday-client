import { useEffect, useState } from "react";
import DayDetails from "../../Component/DayDetails/DayDetails";
import Footer from "../../Component/Footer/Footer";
import Lists from "../../Component/Lists/Lists";
import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NoteSection from "../../Component/NoteSection/NoteSection";
import QuoteBox from "../../Component/QuoteBox/QuoteBox";
import StaticLists from "../../Component/StaticLists/StaticLists";
import { auth } from "../../firebase/firebase";
import { Day, Today, addDay, checkDay, getToday, updateTime, updateToday } from "../../services/dayService";

function HomePage() {

  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(false)
  const [day, setDay] = useState<Day>()
  const [today, setToday] = useState<Today>()


  //firebase onAuthStateChanged
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const saveDay = async () => {
          const check = await checkDay()
          if (check) {
            const oldDay = await addDay()
            if (oldDay) await updateToday(oldDay)
          }
        }
        saveDay().then(() => setSignedIn(true))
      }
      else window.location.replace('/')
      setLoading(false)
    });
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    if (!day) getToday().then(data => setToday(data as Today))
  }, [day, signedIn])

  useEffect(() => {
    if (today && !today.time)
      document.querySelectorAll('[class*="trigger-time"]').forEach(el =>
        el.addEventListener('click', () => updateTime().then(() => {
          getToday().then(data => setToday(data as Today))
        }))
      )
  }, [today])

  return (
    <div className="App">
      {!loading &&
        <>
          <NavPostAuth />
          <QuoteBox date={day?.date ? day.date : today?.date} />
          {signedIn &&
            <>
              <DayDetails day={day} setDay={setDay} today={today} />
              {day ?
                <StaticLists lists={day.lists} />
                :
                <Lists />
              }
              <NoteSection day={day || today} />
            </>
          }
        </>
      }
      <Footer />
    </div>
  );
}


export default HomePage