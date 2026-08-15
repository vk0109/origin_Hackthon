import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfO3tPsYEPzdAuzooEIxLSXbUkfSmspKM",
  authDomain: "disasterelief-31574.firebaseapp.com",
  projectId: "disasterelief-31574",
  storageBucket: "disasterelief-31574.firebasestorage.app",
  messagingSenderId: "267291767242",
  appId: "1:267291767242:web:2091179cf4c2e9d724df33",
  measurementId: "G-7FH3VW1CHS"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);