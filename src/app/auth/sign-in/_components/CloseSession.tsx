import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

async function handleLogout() {
  await signOut(auth);
  Cookies.remove("authToken");
  window.location.href = "/login";
}
