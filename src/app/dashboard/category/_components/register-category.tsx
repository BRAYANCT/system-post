"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/firebase/config";
import { doc, setDoc, serverTimestamp, collection, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function RegisterCategory() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const router = useRouter();

  // Obtener el username del usuario logueado
  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.currentUser) return;
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setCurrentUsername(data.username || "");
      }
    };
    fetchUser();
  }, []);

  const handleRegisterCategory = async () => {
    try {
      if (!auth.currentUser) {
        alert("Debes estar logueado para crear una categoría");
        return;
      }

      const ref = doc(collection(db, "category"));
      await setDoc(ref, {
        nombre,
        descripcion,
        usuarioId: auth.currentUser.uid, // uid del creador
        userCategory: currentUsername,        // username del creador
        status: 1,                       // activo por defecto
        creadoEn: serverTimestamp(),
      });

      alert("Categoría creada!");
      router.push("/dashboard/category"); // ruta del listado
    } catch (error) {
      console.error(error);
      alert("Error creando categoría");
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold">Crear Categoría</h1>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de la categoría"
        className="border p-2 rounded"
      />
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        className="border p-2 rounded"
      />
      <button
        onClick={handleRegisterCategory}
        className="bg-blue-600 text-white p-2 rounded mt-2"
      >
        Crear Categoría
      </button>
    </div>
  );
}
