// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfOld07N_An3xZ11HURyQ-KAeqvUMq9Ik",
  authDomain: "tech-tasks-2023.firebaseapp.com",
  databaseURL: "https://tech-tasks-2023-default-rtdb.firebaseio.com",
  projectId: "tech-tasks-2023",
  storageBucket: "tech-tasks-2023.appspot.com",
  messagingSenderId: "551767507391",
  appId: "1:551767507391:web:1aded3a62e13d20a63210a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();