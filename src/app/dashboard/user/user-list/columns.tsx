// system-post/src/app/dashboard/user/user-list/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserData } from "@/firebase/types/user";

export const getColumns = (
  handleToggleStatus: (uid: string, status: number) => void,
  handleEditUser: (user: UserData) => void
): ColumnDef<UserData>[] => [
  {
    id: "status",
    header: "Estado",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <span className={user.status === 1 ? "text-green-600" : "text-red-600"}>
          {user.status === 1 ? "Habilitado" : "Deshabilitado"}
        </span>
      );
    },
  },
  {
    header: "Imagen",
    accessorKey: "fotoURL",
    cell: ({ row }) => {
      const imageUrl = row.original.fotoURL;
      return (
        <img
          src={imageUrl || "https://avatars.githubusercontent.com/u/45835289?v=4&size=64"}
          alt={`Imagen de perfil de ${row.original.username || "usuario"}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    },
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "telefono", header: "Teléfono" },
  { accessorKey: "username", header: "Username" },
  { accessorKey: "rol", header: "Rol" },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          {
            user.status === 1 ? 
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleEditUser(user)}
            title="Editar usuario"
          >
            ✏️
          </Button>:<></>
          }

          <Button
            size="icon"
            variant="outline"
            onClick={() => handleToggleStatus(user.uid, user.status)}
            title={user.status === 1 ? "Deshabilitar usuario" : "Habilitar usuario"}
          >
            {user.status === 1 ? <Eye size={16} /> : <EyeOff size={16} />}
          </Button>
        </div>
      );
    },
  },
];
