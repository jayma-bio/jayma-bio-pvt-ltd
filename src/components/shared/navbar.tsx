"use client";
import { MenuItem } from "@/constants/landing/menuItem";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { MobileNavbar } from "./mobileNav";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 w-full py-3 px-5 md:px-6 z-30 bg-white/90 border-b border-gray-200 backdrop-blur-lg">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between 2xl:px-8">
        <div className="lg:flex flex-col shrink-0 hidden">
          <Link href="/" className="flex justify-center items-center gap-2">
            <Image
              src="/logos/logo.png"
              alt="logo"
              height={65}
              width={65}
              className="shrink-0"
            />
            <h1 className="text-medium font-medium max-w-60">
              Jayma Bio Innovations <br /> Private Limited
            </h1>
          </Link>
        </div>
        <div className="flex items-center shrink-0 lg:hidden">
          <Link
            href="/"
            className="flex flex-row justify-center items-center gap-4"
          >
            <Image
              src="/logos/logo.png"
              alt="logo"
              height={50}
              width={50}
              className="shrink-0"
            />
          </Link>
          <h1 className="text-sm max-w-60 ml-1.5">
            Jayma Bio Innovations <br /> Private Limited
          </h1>
        </div>

        <div className="hidden lg:flex items-center justify-between ml-4">
          <div className="flex space-x-5">
            {MenuItem.map((item, index) => {
              const active =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== "/");
              return (
                <Link key={index} href={item.href}>
                  <div
                    className={cn(
                      "px-2 py-1 bg-[#F1F1F1] flex items-center gap-4 rounded-full w-[120px] justify-end",
                      active && "bg-lightGreen",
                      item.label === "Products" && "w-[140px]",
                      item.label === "Contact" && "w-[140px]"
                    )}
                  >
                    <p className="text-green text-medium">{item.label}</p>
                    <div className="w-8 h-8 p-1 object-contain rounded-full items-center flex bg-white shrink-0 justify-center">
                      <img
                        src={item.icon}
                        alt="icon"
                        className={cn(
                          "size-6",
                          item.icon === "/navIcon/contact.svg" &&
                            "!size-4 m-0.5 shrink-0"
                        )}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
