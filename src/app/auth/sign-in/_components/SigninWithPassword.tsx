"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup from "@/components/FormElements/InputGroup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

export default function SigninWithPassword() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined }); // limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔹 Validaciones simples
    const newErrors: { email?: string; password?: string } = {};
    if (!data.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email";
    if (!data.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const token = await userCredential.user.getIdToken();

      Cookies.set("authToken", token, { expires: data.remember ? 7 : undefined });
      toast.success("Welcome back!");
      router.push("/dashboard/home");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      } else {
        toast.error("Login failed, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputGroup
        type="email"
        label="Email"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />
      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}

      <InputGroup
        type="password"
        label="Password"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />{errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}


      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          onChange={(e) => setData({ ...data, remember: e.target.checked })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full py-4 rounded-lg bg-blue-600 text-white font-semibold transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
