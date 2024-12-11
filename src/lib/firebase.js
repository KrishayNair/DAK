// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2a9nstgy46bRRHr_eWlLjgU5YOU8zlNA",
  authDomain: "dak-sih.firebaseapp.com",
  projectId: "dak-sih",
  storageBucket: "dak-sih.firebasestorage.app",
  messagingSenderId: "104464634120",
  appId: "1:104464634120:web:57f0b5bf3e3caf88f69cbd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;