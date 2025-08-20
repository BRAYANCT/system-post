//dashboard/user/_components/personal-info.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/firebase/lib/user";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function UserForm() {
  const [form, setForm] = useState({
    nombre: "",
    username: "",
    email: "",
    password: "",
    telefono: "",
    rol: "empleado",
    status: 1, // ahora coincide con UserStatus
    foto: null as File | null,
  });

  const [loading, setLoading] = useState(false);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, files } = e.target as HTMLInputElement;
  if (files && files.length > 0) {
    setForm({ ...form, [name]: files[0] });
  } else {
    setForm({
      ...form,
      [name]: name === "status" ? Number(value) : value,
    });
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Pasamos el archivo separado
    const result = await registerUser(form, form.foto || undefined);

    if (result.success) {
      toast.success("Usuario creado correctamente");

      setForm({
        nombre: "",
        username: "",
        email: "",
        password: "",
        telefono: "",
        rol: "empleado",
        status: 1,
        foto: null,
      });
    } else {
      toast.error(result.message);
    }
  } catch (error: any) {
    toast.error(error.message || "Error al crear usuario");
  } finally {
    setLoading(false);
  }
};

 return (
  <form
    className="space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8"
    onSubmit={handleSubmit}
  >
    {/* ✨ Primera fila: Datos personales */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg p-3"
      />
      <Input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg p-3"
      />
      <Input
        type="email"
        name="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
        required
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg p-3"
      />
      <Input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg p-3"
      />
    </div>

    {/* ✨ Segunda fila: Información adicional */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
      <Input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg p-3"
      />

      <select
        name="rol"
        value={form.rol}
        onChange={handleChange}
        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3 bg-white dark:bg-gray-700"
      >
        <option value="admin">Administrador</option>
        <option value="empleado">Empleado</option>
        <option value="cliente">Cliente</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3 bg-white dark:bg-gray-700"
      >
        <option value={1}>Habilitado</option>
        <option value={2}>Inhabilitado</option>
      </select>

      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 p-3 justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
        <Upload className="h-5 w-5 text-gray-500" />
        <span className="text-gray-600 dark:text-gray-300 text-sm">Subir Foto</span>
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
      {form.foto && (
        <p className="col-span-full text-sm text-gray-500 mt-1 truncate">{form.foto.name}</p>
      )}
    </div>

    {/* ✨ Botón */}
    <Button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
    >
      {loading ? "Creando..." : "Crear Usuario"}
    </Button>
  </form>
);

}