// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWPmb0JZShIE6-aOxcX-CnIvxoKdCLHGI",
  authDomain: "ecommerce-d7d5f.firebaseapp.com",
  projectId: "ecommerce-d7d5f",
  storageBucket: "ecommerce-d7d5f.firebasestorage.app",
  messagingSenderId: "1053857400313",
  appId: "1:1053857400313:web:28abdea7da7c66cf42a928",
  measurementId: "G-ZGNGS22LR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

export function crearUsuario(email, password) {
  // Devuelve la promesa
  return createUserWithEmailAndPassword(auth, email, password);
}

export function iniciarSesion(email, password) {
  // Devuelve la promesa
  return signInWithEmailAndPassword(auth, email, password);
}