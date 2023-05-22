// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4bUcSdao-1nvN9RkdR3ILhlo0XS8z608",
  authDomain: "ecommerce-cab58.firebaseapp.com",
  projectId: "ecommerce-cab58",
  storageBucket: "ecommerce-cab58.appspot.com",
  messagingSenderId: "287192629882",
  appId: "1:287192629882:web:55ae76065922a394be71c3",
  measurementId: "G-3THN9690SW",
};

// Initialize Firebase
const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
