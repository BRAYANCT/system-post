// system-post/src/app/dashboard/user/_components/editar-info.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserData, UserRole, UserStatus } from "@/firebase/types/user";
import { toast } from "sonner";
import { updateUser } from "@/firebase/lib/user";

interface EditUserFormProps {
  user: UserData | null;        // Usuario seleccionado
  isOpen: boolean;              // Controla el modal
  onClose: () => void;          // Cierra el modal
  onUpdate: () => void;         // Refresca la tabla
}

export default function EditUserForm({ user, isOpen, onClose, onUpdate }: EditUserFormProps) {
  const [formData, setFormData] = useState<UserData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: "" }); // Reset password al abrir modal
      setFile(null);
    }
  }, [user]);

  if (!formData) return null;

  const handleChange = (field: keyof UserData, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!formData?.uid) return;
    setLoading(true);

    try {
      const result = await updateUser(formData.uid, formData, file);

      if (result.success) {
        toast.success("Usuario actualizado con éxito");
        onClose();
        onUpdate();
      } else {
        toast.error(result.message || "Error al actualizar usuario");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-3">
          <Input
            value={formData.nombre || ""}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Nombre"
          />
          <Input
            value={formData.username || ""}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Username"
          />
          <Input
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
            type="email"
          />
          <Input
            value={formData.telefono || ""}
            onChange={(e) => handleChange("telefono", e.target.value)}
            placeholder="Teléfono"
          />

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 p-3 justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Subir Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {file && <p className="text-sm text-gray-500 truncate">{file.name}</p>}

          <Input
            value={formData.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Nueva contraseña"
            type="password"
          />

          <select
            className="border p-2 rounded"
            value={formData.rol}
            onChange={(e) => handleChange("rol", e.target.value as UserRole)}
          >
            <option value="admin">Admin</option>
            <option value="empleado">Empleado</option>
            <option value="cliente">Cliente</option>
          </select>

          <select
            className="border p-2 rounded"
            value={formData.status}
            onChange={(e) => handleChange("status", Number(e.target.value) as UserStatus)}
          >
            <option value={1}>Habilitado</option>
            <option value={2}>Deshabilitado</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
