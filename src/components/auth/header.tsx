import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link href="/" className="flex items-center cursor-pointer">
        <img src="/logos/site-logo.svg" alt="logo" className={cn("w-[80px]")} />
      </Link>
      {/* <p className="text-black dark:text-white text-md">{label}</p> */}
    </div>
  );
};
