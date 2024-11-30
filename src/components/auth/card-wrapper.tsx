"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { Logo } from "../shared/logo";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="w-full h-[85vh] md:min-h-screen flex flex-col items-center justify-start md:justify-center px-10 md:px-32 lg:px-44 2xl:px-64 text-black gap-6 bg-white dark:bg-black">
      <div className="w-full hidden md:block">
        <Header label={headerLabel} />
      </div>

      <div className="flex flex-col w-full mt-10">{children}</div>

      {showSocial && (
        <div className="w-full flex flex-col justify-center items-center -mt-2 gap-2">
          <div className="flex items-center space-x-8">
            <div className="h-[1px] bg-black dark:bg-white w-14 md:w-16 lg:w-24"></div>
            <span className="text-sm text-black dark:text-white">or continue with</span>
            <div className="h-[1px] bg-black dark:bg-white w-14 md:w-16 lg:w-24"></div>
          </div>
          <Social />
        </div>
      )}
      <div className="">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </div>
    </div>
  );
};
