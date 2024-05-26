// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
const db = getFirestore(app);

export { db };


// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getDatabase, ref, push, set, onValue } from 'firebase/database';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCCRHKjtF7OOyCAbsLHIQlB2SZ_sXLLDrI',
//   authDomain: 'do-an-football.firebaseapp.com',
//   projectId: 'do-an-football',
//   storageBucket: 'do-an-football.appspot.com',
//   messagingSenderId: '466280256499',
//   appId: '1:466280256499:web:860a0d14c5cca25ea4f886',
//   measurementId: 'G-3GHM64E9PL'
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = getDatabase(app);
// export { database, ref, push, onValue };
