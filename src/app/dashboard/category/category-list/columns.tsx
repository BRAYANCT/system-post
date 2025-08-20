"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryData } from "@/firebase/lib/categorias";

export const getColumns = (
  handleToggleStatus: (id: string, status: number) => void,
  handleEditCategory: (category: CategoryData) => void
): ColumnDef<CategoryData>[] => [
  {
    id: "status",
    header: "Estado",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <span
          className={category.status === 1 ? "text-green-600" : "text-red-600"}
        >
          {category.status === 1 ? "Habilitado" : "Deshabilitado"}
        </span>
      );
    },
  },

  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "descripcion", header: "Descripción" },

  {
    id: "createdBy",
    header: "Creado por",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <span>{category.createdBy || category.userCategory}</span> // Mostrar usuario creador
      );
    },
  },

  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex gap-2">
          {category.status === 1 && (
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleEditCategory(category)}
              title="Editar categoría"
            >
              ✏️
            </Button>
          )}

          <Button
            size="icon"
            variant="outline"
            onClick={() =>
              handleToggleStatus(category.uid, category.status)
            }
            title={
              category.status === 1
                ? "Deshabilitar categoría"
                : "Habilitar categoría"
            }
          >
            {category.status === 1 ? <Eye size={16} /> : <EyeOff size={16} />}
          </Button>
        </div>
      );
    },
  },
];
