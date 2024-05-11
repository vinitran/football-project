// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCCRHKjtF7OOyCAbsLHIQlB2SZ_sXLLDrI',
  authDomain: 'do-an-football.firebaseapp.com',
  projectId: 'do-an-football',
  storageBucket: 'do-an-football.appspot.com',
  messagingSenderId: '466280256499',
  appId: '1:466280256499:web:860a0d14c5cca25ea4f886',
  measurementId: 'G-3GHM64E9PL'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database, ref, push, onValue };
