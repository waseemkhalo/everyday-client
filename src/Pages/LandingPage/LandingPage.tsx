import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer/Footer";
import LandingHero from "../../Component/LandingHero/LandingHero";
import LandingMain from "../../Component/LandingMain/LandingMain";
import NavPreAuth from "../../Component/NavPreAuth/NavPreAuth";
import { auth } from "../../firebase/firebase";

function LandingPage() {
  const navigate = useNavigate()
  // if user is already logged in, redirect to home
  auth.onAuthStateChanged((user) => {
    if (user) navigate('/home', { replace: true })
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
