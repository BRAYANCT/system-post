"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { CategoryData, updateCategory } from "@/firebase/lib/categorias";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore"; // 👈 para fecha

interface EditCategoryModalProps {
  category: CategoryData;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditCategoryModal({ category, isOpen, onClose, onUpdate }: EditCategoryModalProps) {
  const [formData, setFormData] = useState<CategoryData>({ ...category });

  useEffect(() => {
    setFormData({ ...category });
  }, [category]);

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión para editar.");
      return;
    }

    await updateCategory(category.uid as string, {
      ...formData,
    userCategory: user.displayName || user.email || user.uid,
      creadoEn: Date.now(),     // 👈 timestamp local
      // si quieres usar el timestamp del servidor de Firestore:
      // creadoEn: serverTimestamp() as unknown as number
    });

    onUpdate();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoría</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-3">
          <Input
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Nombre"
          />
          <Input
            value={formData.descripcion || ""}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Descripción"
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
