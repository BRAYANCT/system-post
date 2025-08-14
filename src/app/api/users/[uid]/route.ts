// app/api/users/[uid]/route.ts
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export async function PATCH(req: Request, { params }: { params: { uid: string } }) {
  try {
    const body = await req.json();

    await updateDoc(doc(db, "users", params.uid), {
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      rol: body.rol,
      estado: body.estado, // 1 habilitado, 0 inhabilitado
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Error updating user" }), { status: 500 });
  }
}
