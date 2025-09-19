import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJAMYOjtDtXX89cALBEK1QIUvoJ3G6GWg",
  authDomain: "week7-yangxu.firebaseapp.com",
  projectId: "week7-yangxu",
  storageBucket: "week7-yangxu.appspot.com",
  messagingSenderId: "227489993078",
  appId: "1:227489993078:web:a3b04b4a48f401691c6a57"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
