// firebase/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { UserData } from "@/firebase/types/user";

/** Crear usuario y guardar datos en Firestore */
export const registrarUsuario = async (
  email: string,
  password: string,
  data: Omit<UserData, "uid" | "creadoEn">
) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const userData: UserData = {
    ...data,
    uid,
    email,
    creadoEn: Date.now(),
  };

  await setDoc(doc(db, "users", uid), userData);

  return uid;
};

/** Iniciar sesión */
export const iniciarSesion = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

/** Cerrar sesión */
export const cerrarSesion = () => signOut(auth);
