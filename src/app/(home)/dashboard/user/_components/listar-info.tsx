// (home)/dashboard/user/_components/listar-info.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { getUsers, toggleUserStatus } from "@/firebase/lib/user";
import EditUserForm from "./editar-info";
import { UserData } from "@/types/user";

export function ListUserForm() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (user: UserData) => {
    const newStatus = user.status === 1 ? 2 : 1;
    const result = await toggleUserStatus(user.uid!, newStatus);
    if (result.success) {
      toast.success(`Usuario ${newStatus === 1 ? "habilitado" : "inhabilitado"}`);
      fetchUsers();
    } else {
      toast.error(result.message || "Error al cambiar estado");
    }
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUserSaved = () => {
    fetchUsers(); // Refresca la lista
    setEditingUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <Toaster position="top-center" reverseOrder={false} />

      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="border p-2">Foto</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Usuario</th>
            <th className="border p-2">Correo</th>
            <th className="border p-2">Rol</th>
            {/* <th className="border p-2">Status</th> */}
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user.uid|| index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="border p-2">
                {user.fotoURL ? (
                  <Image src={user.fotoURL} alt={user.nombre} width={40} height={40} className="rounded-full" />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                )}
              </td>
              <td className="border p-2">{user.nombre}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.rol}</td>
              {/* <td className="border p-2">{user.status === 1 ? "Habilitado" : "Inhabilitado"}</td> */}
              <td className="border p-2 flex gap-2">
                { user.status === 1 ? 
                <button onClick={() => handleEditUser(user)} className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
                  Editar
                </button>:<h1></h1>
              }
              <button
                  onClick={() => handleToggleStatus(user)}
                  className={`px-2 py-1 rounded text-white transition ${
                    user.status === 1 ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {user.status === 1 ? "Inhabilitar" : "Habilitar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditUserForm
          user={editingUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={handleUserSaved}
        />
      )}
    </div>
  );
}
