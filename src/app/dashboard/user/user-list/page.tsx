// system-post/src/app/dashboard/user/user-list/page.tsx
"use client";

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { listUsers, toggleUserStatus } from "@/firebase/lib/user";
import { UserData } from "@/firebase/types/user";
import EditUserForm from "../_components/editar-info";
import { toast } from "sonner";

const DataTableUser = forwardRef((props, ref) => {
  const [data, setData] = useState<UserData[]>([]);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const users = await listUsers();
      setData(users); // asegúrate de que esto siempre sea un array
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los usuarios");
    }
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async (uid: string, currentStatus: number) => {
    try {
      const newStatus = currentStatus === 1 ? 2 : 1;
      await toggleUserStatus(uid, newStatus);
      await fetchData();
      toast.success("Estado del usuario actualizado");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el estado del usuario");
    }
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const columns = getColumns(handleToggleStatus, handleEditUser);

  return (
    <>
      <DataTable columns={columns} data={data} />

      {/* Modal de edición */}
      <EditUserForm
        user={editingUser}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={async () => {
          await fetchData();
          toast.success("Usuario actualizado correctamente"); // Mensaje de guardado
        }}
      />
    </>
  );
});

DataTableUser.displayName = "DataTableUser";
export default DataTableUser;
