// firebase/auth.ts
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { UserData } from "@/firebase/types/user";
import Cookies from "js-cookie";

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

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    // Guardamos el token en una cookie
    Cookies.set("authToken", token, { expires: 1 }); // 1 día

    window.location.href = "/dashboard/home"; // Redirige al dashboard
  } catch (error) {
    console.error("Error en login:", error);
    alert("Correo o contraseña incorrectos");
  }
}
