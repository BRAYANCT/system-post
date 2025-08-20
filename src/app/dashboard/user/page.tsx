// system-post/src/app/dashboard/user/page.tsx
"use client";

import { useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserForm from "./_components/personal-info";
import DataTableUser from "./user-list/page";

export default function UserPageComponent() {
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef<{ fetchData: () => void }>(null);

  const handleUserSaved = () => {
    setShowForm(false);
    tableRef.current?.fetchData(); // Refresca la tabla automáticamente
  };

  return (
    <div className="mx-auto w-full max-w-[1080px] p-4">
      <Breadcrumb pageName="Registrar Usuario" />

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

      {showForm && <UserForm onUserSaved={handleUserSaved} />}

      <div className="mt-6">
        <DataTableUser ref={tableRef} />
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
