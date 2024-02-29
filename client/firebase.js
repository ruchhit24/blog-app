 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "blog-app-d294f.firebaseapp.com",
  projectId: "blog-app-d294f",
  storageBucket: "blog-app-d294f.appspot.com",
  messagingSenderId: "379389810598",
  appId: "1:379389810598:web:256a762b5dacec2b622167"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);