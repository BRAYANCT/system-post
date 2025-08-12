import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwgDhUNDYXeHLfZVyd3QZKukhLkd83Kz4",
  authDomain: "sistemapost-42805.firebaseapp.com",
  projectId: "sistemapost-42805",
  storageBucket: "sistemapost-42805.firebasestorage.app",
  messagingSenderId: "1048053518122",
  appId: "1:1048053518122:web:00212a65b1615971c7d853"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
