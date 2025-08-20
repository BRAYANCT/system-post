"use client";

import { useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RegisterCategory from "./_components/register-category"; // tu formulario de categoría
import DataTableCategory from "./category-list/page"; // tu tabla de categorías

export default function CategoryPage() {
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef<{ fetchData: () => void }>(null);

  const handleCategorySaved = () => {
    setShowForm(false);
    tableRef.current?.fetchData(); // refresca la tabla automáticamente
  };

  return (
    <div className="mx-auto w-full max-w-[1080px] p-4">
      <Breadcrumb pageName="Registrar Categoría" />

      <div className="my-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Registrar Categoría
          </button>
        ) : (
          <button
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Ocultar Formulario
          </button>
        )}
      </div>

      {showForm && <RegisterCategory onCategorySaved={handleCategorySaved} />}

      <div className="mt-6">
        <DataTableCategory ref={tableRef} />
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
