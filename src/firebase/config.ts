// src/firebase/config.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // 👈 Agregar esto
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDV1Tq0BsBq-UJL6Fw6cyCBc8c69mVeGUQ",
  authDomain: "projectbrayanct.firebaseapp.com",
  projectId: "projectbrayanct",
  storageBucket: "projectbrayanct.appspot.com", // 🔧 Corrige esto también
  messagingSenderId: "694149973553",
  appId: "1:694149973553:web:c1c77501f8f93beef9f710"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app); // 👈 Aquí exportamos la Realtime Database
export const storage = getStorage(app);
