// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { addUser } from "../services/userService";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHycmrZmWas2CH7yjG63ZEv-t_mPRO6a0",
  authDomain: "project-everyday.firebaseapp.com",
  projectId: "project-everyday",
  storageBucket: "project-everyday.appspot.com",
  messagingSenderId: "700852007715",
  appId: "1:700852007715:web:1e1d20d89bc0bc16c4d296",
  measurementId: "G-ZZ514GQ2LT"
};

// config FirebaseUI
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      // User successfully signed in.
      // this is a new user, add them to the firestore users collection
      if (authResult.additionalUserInfo.isNewUser) {
        addUser(authResult.user.uid)
      }
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    // ...
    onSignInSubmit();
  }
}, auth);

