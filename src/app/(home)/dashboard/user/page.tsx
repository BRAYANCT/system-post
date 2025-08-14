"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserForm from "./_components/personal-info";
import { ListUserForm } from "./_components/listar-info";

export default function SettingsPage() {
  const [showForm, setShowForm] = useState(false);

  // Función que se ejecuta cuando el formulario guarda el usuario
  const handleUserSaved = () => {
    toast.success("Datos del usuario guardados con éxito");
    setShowForm(false); // opcional: ocultar el formulario después de guardar
  };

  return (
    <div className="mx-auto w-full max-w-[1080px] p-4">
      <Breadcrumb pageName="Registrar Usuario" />

      {/* Botón único que cambia según el estado */}
      <div className="my-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Registrar Usuario
          </button>
        ) : (
          <button
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Ocultar Usuario
          </button>
        )}
      </div>

      {/* Mostrar formulario solo si showForm es true */}
      {showForm && <UserForm onUserSaved={handleUserSaved} />}
<ListUserForm />
      {/* Componente Toaster para los mensajes */}
       <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              marginTop: "80px", // evita que tape la cabecera
              background: "#4ade80",
              color: "#000",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              zIndex: 9999, // siempre encima
            },
            duration: 3000,
          },
          error: {
            style: {
              marginTop: "80px",
              background: "#f87171",
              color: "#000",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              zIndex: 9999,
            },
            duration: 4000,
          },
        }}
      />
    </div>
  );
}
