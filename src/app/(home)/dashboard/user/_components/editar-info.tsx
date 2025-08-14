// (home)/dashboard/user/_components/editar-info.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { UserData } from "@/types/user";
import { updateUser } from "@/firebase/lib/user";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface EditUserFormProps {
  user: UserData;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditUserForm({ user, isOpen, onClose, onSaved }: EditUserFormProps) {
  const [form, setForm] = useState<UserData>(user);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
    setForm(prev => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.uid) return;

    setLoading(true);
    const result = await updateUser(form.uid, form, file || undefined);

    if (result.success) {
      toast.success("Usuario actualizado correctamente");
      onSaved();
      onClose();
    } else {
      toast.error(result.message || "Error al actualizar usuario");
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl p-6">
        <Dialog.Title className="text-lg font-bold mb-4">Editar Usuario</Dialog.Title>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="nombre" placeholder="Nombre" value={form.nombre || ""} onChange={handleChange} required />
            <Input name="username" placeholder="Username" value={form.username || ""} onChange={handleChange} required />
            <Input name="email" placeholder="Correo" type="email" value={form.email || ""} onChange={handleChange} required />
            <Input name="telefono" placeholder="Teléfono" value={form.telefono || ""} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="rol" value={form.rol} onChange={handleChange} className="p-2 rounded border">
              <option value="admin">Administrador</option>
              <option value="empleado">Empleado</option>
              <option value="cliente">Cliente</option>
            </select>

            <label className="flex items-center gap-2 border border-dashed p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <Upload className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Subir Foto</span>
              <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
            </label>
            {file && <p className="col-span-full text-sm truncate">{file.name}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
