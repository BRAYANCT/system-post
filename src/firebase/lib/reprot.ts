"use client";

import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PurchaseData } from "./purchases";
import { SaleData } from "./sales";
import { UserData } from "./users"; // si creas tu api de users

/** Total de compras */
export async function totalPurchases(): Promise<number> {
  const snapshot = await getDocs(collection(db, "purchases"));
  let total = 0;
  snapshot.docs.forEach(doc => {
    const data = doc.data() as PurchaseData;
    total += data.total || 0;
  });
  return total;
}

/** Total de ventas */
export async function totalSales(): Promise<number> {
  const snapshot = await getDocs(collection(db, "sales"));
  let total = 0;
  snapshot.docs.forEach(doc => {
    const data = doc.data() as SaleData;
    total += data.total || 0;
  });
  return total;
}

/** Ventas por cliente */
export async function salesByClient(clienteNombre: string): Promise<SaleData[]> {
  const q = query(collection(db, "sales"), where("cliente.nombre", "==", clienteNombre));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as SaleData) }));
}

/** Compras por producto */
export async function purchasesByProduct(productoId: string): Promise<PurchaseData[]> {
  const q = query(collection(db, "purchases"), where("productoId", "==", productoId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as PurchaseData) }));
}

/** Productos más vendidos */
export async function topSellingProducts(): Promise<{ productoId: string; totalVendido: number }[]> {
  const snapshot = await getDocs(collection(db, "sales"));
  const map: Record<string, number> = {};
  snapshot.docs.forEach(doc => {
    const data = doc.data() as SaleData;
    if (!map[data.productoId]) map[data.productoId] = 0;
    map[data.productoId] += data.total || 0;
  });
  return Object.entries(map).map(([productoId, totalVendido]) => ({ productoId, totalVendido }));
}

/** Total de usuarios */
export async function totalUsers(): Promise<number> {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.size;
}
