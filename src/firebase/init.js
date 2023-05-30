import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCelFd53vBEjPHdS4EeJlX7KSBkArWjdtI",
  authDomain: "mini-capstone-4fa86.firebaseapp.com",
  projectId: "mini-capstone-4fa86",
  storageBucket: "mini-capstone-4fa86.appspot.com",
  messagingSenderId: "799172905716",
  appId: "1:799172905716:web:5c31734fb2f883a5fbeca1",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db, app };
