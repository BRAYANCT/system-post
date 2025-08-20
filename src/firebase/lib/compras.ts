"use client";

import { db } from "@/firebase/config";
import { doc, setDoc, updateDoc, getDocs, collection, serverTimestamp, deleteDoc } from "firebase/firestore";

export interface PurchaseData {
  id?: string;
  productoId: string;
  cantidad: number;
  precioUnitario: number;
  total?: number;
  fecha?: number;
  usuarioId: string;  // ID del cliente/usuario
  cliente?: {         // datos del cliente
    nombre: string;
    email?: string;
    telefono?: string;
  };
}

/** Crear compra */
export async function createPurchase(data: PurchaseData) {
  try {
    const ref = doc(collection(db, "purchases"));
    await setDoc(ref, {
      ...data,
      total: data.cantidad * data.precioUnitario,
      fecha: serverTimestamp(),
      cliente: data.cliente || null,
    });
    return { success: true, id: ref.id };
  } catch (error) {
    console.error("Error al crear compra:", error);
    return { success: false, message: "Error al crear compra" };
  }
}

/** Listar compras */
export async function listPurchases(): Promise<PurchaseData[]> {
  try {
    const snapshot = await getDocs(collection(db, "purchases"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as PurchaseData) }));
  } catch (error) {
    console.error("Error al listar compras:", error);
    return [];
  }
}

/** Actualizar compra */
export async function updatePurchase(id: string, data: Partial<PurchaseData>) {
  try {
    await updateDoc(doc(db, "purchases", id), {
      ...data,
      total: data.cantidad && data.precioUnitario ? data.cantidad * data.precioUnitario : undefined,
    });
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar compra:", error);
    return { success: false, message: "Error al actualizar compra" };
  }
}

/** Eliminar compra */
export async function deletePurchase(id: string) {
  try {
    await deleteDoc(doc(db, "purchases", id));
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar compra:", error);
    return { success: false, message: "Error al eliminar compra" };
  }
}
