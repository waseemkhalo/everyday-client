import LandingHero from "../../Component/LandingHero/LandingHero";
import NavPreAuth from "../../Component/NavPreAuth/NavPreAuth";
import LandingMain from "../../Component/LandingMain/LandingMain";
import Footer from "../../Component/Footer/Footer";
import { auth } from "../../firebase/firebase";
import { useState } from "react";

function LandingPage() {
  // if user is already logged in, redirect to home
  auth.onAuthStateChanged((user) => {
    if (user) window.location.replace(window.location.href + 'home')
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
      <NavPreAuth openAuth={openAuth} handleOpenAuth={handleOpenAuth} handleCloseAuth={handleCloseAuth}/>
      <LandingHero handleOpenAuth={handleOpenAuth}/>
      <LandingMain />
      <Footer />

    </>
  );
}

export default LandingPage;
