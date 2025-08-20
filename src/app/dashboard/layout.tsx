// app/(home)/dashboard/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { Providers } from "@/app/providers";
import NextTopLoader from "nextjs-toploader";
import DashboardLoading from "@/components/Skeleton/loading";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("authToken")?.value;
  if (!token) redirect("/auth/sign-in");

  return (
    <Providers>
      <NextTopLoader color="#5750F1" showSpinner={false} />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
          <Header />
          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
      {children || <DashboardLoading />} {/* Skeleton si no hay children aún */}
          </main>
        </div>
      </div>
    </Providers>
  );
}

