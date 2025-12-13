import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl1ys4GE_II3Y1WD9XSCyl6UEjf5vJg6c",
    authDomain: "qr-menu1-3b807.firebaseapp.com",
    projectId: "qr-menu1-3b807",
    storageBucket: "qr-menu1-3b807.firebasestorage.app",
    messagingSenderId: "13216646428",
    appId: "1:13216646428:web:bb01a0db24ea88916b26d9",
    measurementId: "G-BD4NWPTHN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
