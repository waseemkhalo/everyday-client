// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);


