// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
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
    {
      provider: "microsoft.com",
      providerName: "Microsoft",
      // To override the full label of the button.
      // fullLabel: 'Login with Microsoft',
      buttonColor: "#2F2F2F",
      iconUrl: "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/78-microsoft-512.png",
      loginHintKey: "login_hint",
      scopes: ["mail.read"],
      customParameters: {
        prompt: "consent",
      },
    },
  ],
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

// Initialize Firebase Auth
export const auth = firebase.auth(app);
