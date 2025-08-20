"use client";

import { db } from "@/firebase/config";
import { doc, setDoc, updateDoc, getDocs, collection, deleteDoc, serverTimestamp } from "firebase/firestore";

export interface ProductData {
  id?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoriaId: string;
  stock: number;
  imagenURL?: string;
  creadoEn?: number;
}

/** Crear producto */
export async function createProduct(data: ProductData) {
  try {
    const ref = doc(collection(db, "products"));
    await setDoc(ref, { ...data, creadoEn: serverTimestamp() });
    return { success: true, id: ref.id };
  } catch (error) {
    console.error("Error crear producto:", error);
    return { success: false, message: "Error al crear producto" };
  }
}

/** Listar productos */
export async function listProducts(): Promise<ProductData[]> {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ProductData) }));
  } catch (error) {
    console.error("Error listar productos:", error);
    return [];
  }
}

/** Editar producto */
export async function updateProduct(id: string, data: Partial<ProductData>) {
  try {
    await updateDoc(doc(db, "products", id), { ...data });
    return { success: true };
  } catch (error) {
    console.error("Error actualizar producto:", error);
    return { success: false, message: "Error al actualizar producto" };
  }
}

/** Eliminar producto */
export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, "products", id));
    return { success: true };
  } catch (error) {
    console.error("Error eliminar producto:", error);
    return { success: false, message: "Error al eliminar producto" };
  }
}
