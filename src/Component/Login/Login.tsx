import 'firebase/compat/auth';
import { auth, uiConfig } from "../../firebase/firebase";
import StyledFirebaseAuth from "../StyledFirebaseAuth/StyledFirebaseAuth";

function Login() {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  );
}

export default Login;
