import React from "react";
import StyledFirebaseAuth from "../StyledFirebaseAuth/StyledFirebaseAuth";
import { uiConfig, auth } from "../../firebase/firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Login() {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  );
}

export default Login;
