import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAfO3tPsYEPzdAuzooEIxLSXbUkfSmspKM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "disasterelief-31574.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "disasterelief-31574",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "disasterelief-31574.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "267291767242",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:267291767242:web:2091179cf4c2e9d724df33",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7FH3VW1CHS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
