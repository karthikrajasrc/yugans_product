// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoo7Zl4MhKOVjiFe4HbjxEFL508fmLw1o",
  authDomain: "yugans-product.firebaseapp.com",
  projectId: "yugans-product",
  storageBucket: "yugans-product.firebasestorage.app",
  messagingSenderId: "926673133914",
  appId: "1:926673133914:web:28a34f9092d5ce879bd363",
  measurementId: "G-YTSEGMQDYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();