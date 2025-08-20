// system-post/src/app/dashboard/user/_components/register-user.tsx
"use client";

import { useState } from "react";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crear documento en Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        status: 1, // activo por defecto
        role: "vendedor", // o el rol que quieras asignar
        createdAt: serverTimestamp(),
      });

      alert("Usuario registrado!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Error registrando usuario");
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}
