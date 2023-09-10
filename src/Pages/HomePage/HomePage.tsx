import { useEffect, useState } from "react";
import DayDetails from "../../Component/DayDetails/DayDetails";
import Footer from "../../Component/Footer/Footer";
import Lists from "../../Component/Lists/Lists";
import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NoteSection from "../../Component/NoteSection/NoteSection";
import QuoteBox from "../../Component/QuoteBox/QuoteBox";
import StaticLists from "../../Component/StaticLists/StaticLists";

import { auth } from "../../firebase/firebase";
import {
  Day,
  Today,
  addDay,
  checkDay,
  getToday,
  updateTime,
  updateToday,
} from "../../services/dayService";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  // some context for understanding day vs today:
  // today is defined if the user is viewing details for today. it only contains date, time, number and notes. lists come from the user's list sub collection
  // day is defined if the user is viewing a previous day. it is an object containing all details about that previous day, lists included.
  const [day, setDay] = useState<Day>();
  const [today, setToday] = useState<Today>();

  //firebase onAuthStateChanged
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //when user signed in, check if today is a new day
        const saveDay = async () => {
          const check = await checkDay();
          if (check) {
            // if so, store their last session to db, and update today's info
            const oldDay = await addDay();
            if (oldDay) await updateToday(oldDay);
          }
        };
        saveDay().then(() => setSignedIn(true));
      }
      // if not logged in, force redirect to landing page
      else window.location.replace("/");
      setLoading(false);
    });
    //detach listener when unloaded
    return () => unsubscribe();
  }, []);

  //if current view is for today, load today's info
  useEffect(() => {
    if (!day) getToday().then((data) => setToday(data as Today));
  }, [day, signedIn]);

  // if today's time is not yet set, attach event listener's to trigger-time elements
  useEffect(() => {
    if (today && !today.time)
      document.querySelectorAll('[class*="trigger-time"]').forEach((el) =>
        el.addEventListener("click", () =>
          updateTime().then(() => {
            getToday().then((data) => setToday(data as Today));
          })
        )
      );
  }, [today]);


  return (
    <div className="App">
      {!loading && (
        <>
          <NavPostAuth />
          <QuoteBox date={day?.date ? day.date : today?.date} />
          {signedIn && (
            <>
              <DayDetails day={day} setDay={setDay} today={today} />
              {/* show lists for today, and static lists for any other day */}
              {day ? <StaticLists lists={day.lists} listOrder={day.listOrder} /> : <Lists />}
              <NoteSection day={day || today} setToday={setToday} />
            </>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
