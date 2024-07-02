// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "pan-details.firebaseapp.com",
  projectId: "pan-details",
  storageBucket: "pan-details.appspot.com",
  messagingSenderId: "585024920586",
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
