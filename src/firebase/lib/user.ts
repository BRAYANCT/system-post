import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, getDocs, collection, serverTimestamp } from "firebase/firestore";
import { UserData } from "@/firebase/types/user";

// Registrar usuario (ya lo tienes)
export async function registerUser(userData: UserData, file?: File) {
  try {
    let fotoURL = userData.fotoURL || "";

    if (file) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) throw new Error("Cloudinary no configurado");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir imagen a Cloudinary");
      const data = await res.json();
      fotoURL = data.secure_url;
    }

    const cred = await createUserWithEmailAndPassword(auth, userData.email!, userData.password!);
    const uid = cred.user.uid;

    await setDoc(doc(db, "users", uid), {
      nombre: userData.nombre,
      username: userData.username,
      email: userData.email,
      telefono: userData.telefono,
      rol: userData.rol,
      status: userData.status,
      uid,
      fotoURL,
      creadoEn: serverTimestamp(),
    });

    return { success: true, uid };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return { success: false, message: "El correo ya está registrado." };
    }
    console.error("Error en registerUser:", error);
    return { success: false, message: "Error al registrar el usuario." };
  }
}

// Obtener todos los usuarios
export async function getUsers() {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}

// Editar usuario
export async function updateUser(uid: string, data: Partial<UserData>, file?: File) {
  try {
    let fotoURL = data.fotoURL || "";

    if (file) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) throw new Error("Cloudinary no configurado");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir imagen a Cloudinary");
      const resData = await res.json();
      fotoURL = resData.secure_url;
    }

    await updateDoc(doc(db, "users", uid), {
      ...data,
      ...(file && { fotoURL }),
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    return { success: false, message: "Error al actualizar usuario" };
  }
}

// Activar/Inactivar usuario
export async function toggleUserStatus(uid: string, newStatus: number) {
  try {
    await updateDoc(doc(db, "users", uid), { status: newStatus });
    return { success: true };
  } catch (error: any) {
    console.error("Error al cambiar estado:", error);
    return { success: false, message: "Error al cambiar estado" };
  }
}
