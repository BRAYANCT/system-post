"use client";

import { db } from "@/firebase/config";
import { 
  doc, 
  setDoc, 
  updateDoc, 
  getDocs, 
  getDoc,
  collection, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore";

export interface CategoryData {
  uid?: string | number;
  nombre: string;
  descripcion?: string;
  usuarioId?: string;  // ID del usuario creador
  status?: number;
  creadoEn?: number;
  userCategory  ?: string; // Nombre del usuario que creó la categoría
  createdBy?: string;     // 👈 Nombre del usuario creador
}

/** Crear categoría */
export async function createCategory(data: CategoryData) {
  try {
    const ref = doc(collection(db, "category"));
    await setDoc(ref, { ...data, creadoEn: serverTimestamp() });
    return { success: true, id: ref.id };
  } catch (error) {
    console.error("Error crear categoría:", error);
    return { success: false, message: "Error al crear categoría" };
  }
}

/** Listar categorías con nombre de usuario */
export async function listCategories(): Promise<CategoryData[]> {
  try {
    const snapshot = await getDocs(collection(db, "category"));
    const categories: CategoryData[] = [];

    for (const d of snapshot.docs) {
      const data = d.data() as CategoryData;
      let createdBy = "";

      // buscar nombre del usuario
      if (data.usuarioId) {
        try {
          const userSnap = await getDoc(doc(db, "users", data.usuarioId));
          if (userSnap.exists()) {
            createdBy = userSnap.data().nombre || "";
          }
        } catch (err) {
          console.error("Error obteniendo usuario:", err);
        }
      }

      categories.push({
        uid: d.id,
        ...data,
        createdBy, // 👈 se agrega el nombre del usuario
      });
    }

    return categories;
  } catch (error) {
    console.error("Error listar categorías:", error);
    return [];
  }
}

/** Editar categoría */
export async function updateCategory(id: string, data: Partial<CategoryData>) {
  try {
    await updateDoc(doc(db, "category", id), { ...data });
    return { success: true };
  } catch (error) {
    console.error("Error actualizar categoría:", error);
    return { success: false, message: "Error al actualizar categoría" };
  }
}

/** Eliminar categoría */
export async function deleteCategory(id: string) {
  try {
    await deleteDoc(doc(db, "category", id));
    return { success: true };
  } catch (error) {
    console.error("Error eliminar categoría:", error);
    return { success: false, message: "Error al eliminar categoría" };
  }
}

/** Cambiar estado (habilitar/deshabilitar) */
export async function toggleCategoryStatus(uid: string, newStatus: number) {
  try {
    await updateDoc(doc(db, "category", uid), { status: newStatus });
    return { success: true };
  } catch (error: any) {
    console.error("Error al cambiar estado:", error);
    return { success: false, message: "Error al cambiar estado" };
  }
}
