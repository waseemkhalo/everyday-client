// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
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
  measurementId: "G-ZZ514GQ2LT",
};

// config FirebaseUI
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      // User successfully signed in.
      // this is a new user, add them to the firestore users collection
      if (authResult.additionalUserInfo.isNewUser) {
        addUser(authResult.user.uid);
      }
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: "/home",
  signInOptions: [ 
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    {
    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    recaptchaParameters: {
      type: "image", // 'audio'
      size: "invisible", // 'invisible' or 'compact'
      badge: "bottomleft", //' bottomright' or 'inline' applies to invisible.
    },
    defaultCountry: "US",
    defaultNationalNumber: "1234567890",
    loginHint: "+11234567890",
  },
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,

  ],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// invisible reCAPTCHA (no user input) - needed for phone auth
// window.recaptchaVerifier = new RecaptchaVerifier(
//   "recaptcha-container",
//   {
//     size: "invisible",
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       // ...
//       onSignInSubmit();
//     },
//   },
//   auth
// );

// // sign in with phone number
// const phoneNumber = getPhoneNumberFromUserInput();
// const appVerifier = window.recaptchaVerifier;

// signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//   .then((confirmationResult) => {
//     // SMS sent. Prompt user to type the code from the message, then sign the
//     // user in with confirmationResult.confirm(code).
//     window.confirmationResult = confirmationResult;
//   })
//   .catch((error) => {
//     // Error; SMS not sent
//     grecaptcha.reset(window.recaptchaWidgetId);

//     // Or, if you haven't stored the widget ID:
//     window.recaptchaVerifier.render().then(function (widgetId) {
//       grecaptcha.reset(widgetId);
//     });
//   });

// // sign in the user with verfiication code
// const code = getCodeFromUserInput();
// confirmationResult
//   .confirm(code)
//   .then((result) => {
//     // User signed in successfully.
//     const user = result.user;
//     // ...
//   })
//   .catch((error) => {
//     // User couldn't sign in (bad verification code?)
//   });
