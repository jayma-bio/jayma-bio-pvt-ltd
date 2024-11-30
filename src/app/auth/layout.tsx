"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <main className="w-full flex flex-col md:flex-row h-full overflow-y-hidden bg-white">
      <div className="w-2/5 hidden min-h-screen overflow-hidden md:flex flex-col justify-center items-center z-0 auth bg-black relative">
        <div className="flex flex-col items-start justify-center gap-4 pl-10">
          <h1 className="text-6xl font-medium text-white leading-[3.7rem] capitalize">
            {pathname === "/auth/login"
              ? "Sign in into your account"
              : "  Create a New Account"}
          </h1>
          <p className="text-xl font-medium text-white">
            {pathname === "/auth/login"
              ? "Sign in and get started"
              : "Create an account and get started"}
          </p>
        </div>
        <div className="absolute top-10 left-10">
          <Link href="/">
            <Button
              variant="outline"
              className="border-white text-lg bg-transparent text-white flex items-center gap-2 hover:bg-transparent hover:text-white"
            >
              <MoveLeft className="size-5 shrink-0 text-white" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="md:hidden w-full h-[42vh] flex flex-col gap-3 items-start justify-center auth-mobile pl-8 relative pt-4">
        <h1 className="text-3xl font-medium text-white w-[80%]">
          {pathname === "/auth/login"
            ? "Sign in into your account"
            : "  Create a New Account"}
        </h1>
        <p className="text-lg font-medium text-white">
          {pathname === "/auth/login"
            ? "Sign in and get started"
            : "Create an account and get started"}
        </p>
        <div className="absolute top-6 left-8">
          <Link href="/">
            <Button
              variant="outline"
              className="border-white text-sm md:text-lg bg-transparent text-white flex items-center gap-2 hover:bg-transparent hover:text-white"
            >
              <MoveLeft className="size-5 shrink-0 text-white" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-3/5 max-h-screen">{children}</div>
    </main>
  );
};

export default AuthLayout;
