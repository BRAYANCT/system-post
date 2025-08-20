// app/api/login/route.ts
import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  const res = NextResponse.json({ message: "Logged in" });
  res.cookies.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
