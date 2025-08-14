// firebase/lib/storage.ts
export async function uploadImage(file: File, path: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Error subiendo imagen");

  const data = await res.json();
  return data.secure_url as string;
}
