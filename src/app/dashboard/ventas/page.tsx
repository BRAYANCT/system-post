// app/(home)/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ventasPage() {
    const token = (await cookies()).get("authToken")?.value;
  // Si hay sesión → dashboard/home, si no → login
  redirect(token ? "/dashboard/home" : "/auth/sign-in");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Ventas Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">Aquí puedes ver las estadísticas de ventas.</p>
    </div>
  );
}