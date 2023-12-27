import { useState } from "react";
import Footer from "../../Component/Footer/Footer";
import LandingHero from "../../Component/LandingHero/LandingHero";
import LandingMain from "../../Component/LandingMain/LandingMain";
import NavPreAuth from "../../Component/NavPreAuth/NavPreAuth";
import { auth } from "../../firebase/firebase";
import { getToday } from "../../services/dayService";

function LandingPage() {
  // if user is already logged in and exists on db, redirect to home
  auth.onAuthStateChanged((user) => {
    if (user) getToday().then(data => {
      if (data) window.location.replace('home')
    })
  })

  const [openAuth, setOpenAuth] = useState(false);

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };

  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  return (
    <>
      <div className="app">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
        <div className="circle-4"></div>
        <div className="circle-5"></div>
        <div className="circle-6"></div>
        <div className="rectangle">
          <div className="app-content">
            <NavPreAuth openAuth={openAuth} handleOpenAuth={handleOpenAuth} handleCloseAuth={handleCloseAuth} />
            <LandingHero handleOpenAuth={handleOpenAuth} />
            <LandingMain />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
