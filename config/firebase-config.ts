// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
   /*
    apiKey: "AIzaSyAlP1gxNW4K79TzRkgSCLIBHTfBMJFRKqk",
    authDomain: "eshop-df1fc.firebaseapp.com",
    projectId: "eshop-df1fc",
    storageBucket: "eshop-df1fc.appspot.com",
    messagingSenderId: "4972157936",
    appId: "1:4972157936:web:fda83d9a201095b6eedb35"
    */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

