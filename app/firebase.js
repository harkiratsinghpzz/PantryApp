// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq2bFYdT8cWoGZ9KrBsfVBS0IKn1KZk98",
  authDomain: "pantryapp-d6e49.firebaseapp.com",
  projectId: "pantryapp-d6e49",
  storageBucket: "pantryapp-d6e49.appspot.com",
  messagingSenderId: "313564559620",
  appId: "1:313564559620:web:5904c59b92f8f56feeb851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app)
// export { app, firestore };
export const db = getFirestore(app);