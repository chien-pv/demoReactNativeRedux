// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA-pkP0a3px4XTzAui5ZFP3OGVtpQpKn0",
  authDomain: "demornt25.firebaseapp.com",
  databaseURL:
    "https://demornt25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "demornt25",
  storageBucket: "demornt25.firebasestorage.app",
  messagingSenderId: "480145626687",
  appId: "1:480145626687:web:77248bdba413008e190a8a",
  measurementId: "G-XT9MFX1WQL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
export { app, database, auth };
