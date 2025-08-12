import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="p-6">{children}</main>
    </>
  );
}
