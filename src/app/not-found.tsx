// app/not-found.tsx
import { redirect } from "next/navigation";

export default function NotFound() {
  // Redirige siempre al dashboard/home
  redirect("/dashboard/home");
}
