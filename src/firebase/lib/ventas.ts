"use client";

import { db } from "@/firebase/config";
import { doc, setDoc, updateDoc, getDocs, collection, serverTimestamp, deleteDoc } from "firebase/firestore";

export interface SaleData {
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

/** Crear venta */
export async function createSale(data: SaleData) {
  try {
    const ref = doc(collection(db, "sales"));
    await setDoc(ref, {
      ...data,
      total: data.cantidad * data.precioUnitario,
      fecha: serverTimestamp(),
      cliente: data.cliente || null,
    });
    return { success: true, id: ref.id };
  } catch (error) {
    console.error("Error al crear venta:", error);
    return { success: false, message: "Error al crear venta" };
  }
}

/** Listar ventas */
export async function listSales(): Promise<SaleData[]> {
  try {
    const snapshot = await getDocs(collection(db, "sales"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as SaleData) }));
  } catch (error) {
    console.error("Error al listar ventas:", error);
    return [];
  }
}

/** Actualizar venta */
export async function updateSale(id: string, data: Partial<SaleData>) {
  try {
    await updateDoc(doc(db, "sales", id), {
      ...data,
      total: data.cantidad && data.precioUnitario ? data.cantidad * data.precioUnitario : undefined,
    });
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar venta:", error);
    return { success: false, message: "Error al actualizar venta" };
  }
}

/** Eliminar venta */
export async function deleteSale(id: string) {
  try {
    await deleteDoc(doc(db, "sales", id));
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    return { success: false, message: "Error al eliminar venta" };
  }
}
