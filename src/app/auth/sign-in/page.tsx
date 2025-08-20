// app/(home)/auth/sign-in/page.tsx
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SigninWithPassword from "./_components/SigninWithPassword";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#122031] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-[10px] bg-white shadow-lg dark:bg-gray-dark dark:shadow-card overflow-hidden flex flex-col xl:flex-row">
        {/* Formulario */}
        <div className="w-full xl:w-1/2 p-6 sm:p-12 xl:p-16 flex flex-col justify-center">
          <Breadcrumb pageName="Sign In" />
          <h1 className="mb-4 text-3xl font-bold text-dark dark:text-white">
            Welcome Back!
          </h1>
          <p className="mb-6 text-dark-4 dark:text-dark-6">
            Sign in to your account by completing the fields below.
          </p>
          <SigninWithPassword />
        </div>

        {/* Imagen / Logo decorativo */}
        <div className="hidden xl:flex w-1/2 bg-gradient-to-br from-[#1e2d4d] to-[#122031] p-12 relative">
          <Link className="mb-10 inline-block absolute top-6 left-6" href="/">
            <Image
              className="hidden dark:block"
              src="/images/logo/logo.svg"
              alt="Logo"
              width={176}
              height={32}
            />
            <Image
              className="dark:hidden"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
              width={176}
              height={32}
            />
          </Link>
          <div className="m-auto text-center">
            <p className="mb-3 text-xl font-medium text-white">
              Sign in to your account
            </p>
            <Image
              src="/images/grids/grid-02.svg"
              alt="Grid decoration"
              width={405}
              height={325}
              className="mx-auto opacity-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
