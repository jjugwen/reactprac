// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN3FO2EHmtnd_ApMjWDud9zNcfeOUGlEk",
  authDomain: "sparta-react-7dd39.firebaseapp.com",
  projectId: "sparta-react-7dd39",
  storageBucket: "sparta-react-7dd39.appspot.com",
  messagingSenderId: "701964621597",
  appId: "1:701964621597:web:736a2909170409e9a3b3f4",
  measurementId: "G-H9SHV5393J",
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
