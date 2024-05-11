// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEH-cXHKnG30N1NctK55YPyyqAKN4-a4s",
  authDomain: "football-61ccb.firebaseapp.com",
  projectId: "football-61ccb",
  storageBucket: "football-61ccb.appspot.com",
  messagingSenderId: "1027985649693",
  appId: "1:1027985649693:web:2465ffc0676e70695f56f4",
  measurementId: "G-W5MLFJJEF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);