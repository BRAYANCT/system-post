// /firebase/lib/clients.ts
"use client";

import { db } from "@/firebase/config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { UserData } from "../types/user";



// Crear cliente
export async function createClient(data: UserData) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...data,
      rol: "cliente",
      status: data.status || 1,
      creadoEn: serverTimestamp(),
    });
    return { success: true, uid: docRef.id };
  } catch (error) {
    console.error(error);
    return { success: false, message: "No se pudo crear el cliente" };
  }
}

// Listar clientes
export async function listClients(): Promise<UserData[]> {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          uid: doc.id,
          nombre: data.nombre,
          email: data.email || "",
          telefono: data.telefono || "",
          status: data.status ?? 1,
                    rol: data.rol ?? 'cliente',
          creadoEn: data.creadoEn?.seconds || Date.now(),
        };
      })
      .filter((c) => c.status === 1 && c.rol === "cliente"); // solo clientes habilitados
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Actualizar cliente
export async function updateClient(uid: string, data: Partial<UserData>) {
  try {
    await updateDoc(doc(db, "users", uid), data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "No se pudo actualizar el cliente" };
  }
}

// Eliminar cliente
export async function deleteClient(uid: string) {
  try {
    await deleteDoc(doc(db, "users", uid));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "No se pudo eliminar el cliente" };
  }
}
