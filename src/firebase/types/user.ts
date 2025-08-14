// types/user.ts
export type UserRole = "admin" | "empleado" | "cliente";
export type UserStatus = 1 | 2;
export interface UserData {
  uid?: string;
  nombre?: string;
  username  ?:string
  email?: string;
  description ?:"hola"
    telefono?: string;
  fotoURL?: string;
   password?: string;
  status: UserStatus;
  rol: UserRole;
  creadoEn: number; // timestamp
}
