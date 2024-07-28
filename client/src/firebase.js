// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "recipe-site-6588d.firebaseapp.com",
  projectId: "recipe-site-6588d",
  storageBucket: "recipe-site-6588d.appspot.com",
  messagingSenderId: "429207350254",
  appId: "1:429207350254:web:a3b2007e913a8f625efcff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);