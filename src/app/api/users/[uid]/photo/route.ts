import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export async function PATCH(req: Request, { params }: { params: { uid: string } }) {
  try {
    const { imageUrl } = await req.json();
    await updateDoc(doc(db, "users", params.uid), { photoURL: imageUrl });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating photo:", error);
    return new Response(JSON.stringify({ error: "Error updating photo" }), { status: 500 });
  }
}
