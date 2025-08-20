"use client";

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import {
  listCategories,
  toggleCategoryStatus,
} from "@/firebase/lib/categorias";
import { CategoryData } from "@/firebase/lib/categorias";
import EditCategoryModal from "../_components/editar-category";
import { Toaster, toast } from "react-hot-toast";

const DataTableCategory = forwardRef((props, ref) => {
  const [data, setData] = useState<CategoryData[]>([]);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const categories = await listCategories();
      setData(categories || []);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar las categorías");
    }
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: number) => {
    try {
      const newStatus = currentStatus === 1 ? 2 : 1;
      await toggleCategoryStatus(id, newStatus);
      await fetchData();
      toast.success("Estado de la categoría actualizado");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el estado de la categoría");
    }
  };

  const handleEditCategory = (category: CategoryData) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const columns = getColumns(handleToggleStatus, handleEditCategory);

  return (
    <>
      <DataTable columns={columns} data={data} />

      {/* Modal de edición */}
      <EditCategoryModal
        category={editingCategory}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={async () => {
          await fetchData();
          toast.success("Categoría actualizada correctamente");
        }}
      />
    </>
  );
});

DataTableCategory.displayName = "DataTableCategory";
export default DataTableCategory;
