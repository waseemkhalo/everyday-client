import NavPreAuth from "../../Component/NavPreAuth/NavPreAuth";
import { auth } from "../../firebase/firebase";

function LandingPage() {
  auth.onAuthStateChanged((user) => {
    if (user) window.location.replace(window.location.href + 'home')
  })
  return (
    <>
      <NavPreAuth />
    </>
  );
}

export default LandingPage;
