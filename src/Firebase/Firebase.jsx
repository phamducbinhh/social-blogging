import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDDIiqidB85YiV0XZTIuY8MCkk_YBMz848",
  authDomain: "monkey-blogging-96810.firebaseapp.com",
  projectId: "monkey-blogging-96810",
  storageBucket: "monkey-blogging-96810.appspot.com",
  messagingSenderId: "225198381123",
  appId: "1:225198381123:web:6faf30d6cbcaf6d3051cf6",
  measurementId: "G-ZMGHMSK18Z",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
