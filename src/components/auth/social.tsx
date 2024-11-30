"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Social = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    setLoading(true);
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-between gap-x-6 w-full">
      <Button
        variant="outline"
        className={cn(
          "w-full border-black dark:border-white text-black dark:text-white text-lg",
          loading && "opacity-50 cursor-none"
        )}
        onClick={() => onClick("google")}
        disabled={loading}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full border-black dark:border-white text-black dark:text-white text-lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 mr-2 fill-black dark:fill-white" />
        GitHub
      </Button>
    </div>
  );
};
