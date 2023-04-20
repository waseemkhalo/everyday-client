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
      <NavPreAuth openAuth={openAuth} handleOpenAuth={handleOpenAuth} handleCloseAuth={handleCloseAuth} />
      <LandingHero handleOpenAuth={handleOpenAuth} />
      <LandingMain />
      <Footer />

    </>
  );
}

export default LandingPage;
