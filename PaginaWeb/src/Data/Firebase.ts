// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzycEl7w-zxR3DVXYvRt5b0Rnp6Wv4nJk",
  authDomain: "wikigeek-1bc13.firebaseapp.com",
  projectId: "wikigeek-1bc13",
  storageBucket: "wikigeek-1bc13.firebasestorage.app",
  messagingSenderId: "848777187273",
  appId: "1:848777187273:web:ad3e65ce81a4ffc4dd2218",
  measurementId: "G-ERDZJWQWHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
