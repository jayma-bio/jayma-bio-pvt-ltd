"use clienta";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuItem } from "@/constants/landing/menuItem";
import { cn } from "@/lib/utils";
import { AlignJustify, Cog, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { logout } from "@/actions/logout";
import { useState } from "react";
import { GiShoppingBag } from "react-icons/gi";

interface MobileNavbarProps {
  user: any;
}

export const MobileNavbar = ({ user }: MobileNavbarProps) => {
  const [sheetClose, setSheetClose] = useState(false);
  const pathname = usePathname();
  const onClick = () => {
    logout();
  };

  const handleSheetClose = () => {
    setSheetClose(false);
  };
  return (
    <div className="lg:hidden">
      <Sheet open={sheetClose} onOpenChange={setSheetClose}>
        <SheetTrigger className="p-2 border-none">
          <AlignJustify className="size-7 shrink-0 text-green" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col h-full py-1 gap-4">
            <div
              className="flex w-full items-start justify-center shrink-0"
              onClick={handleSheetClose}
            >
              <Link href="/">
                <Image
                  src="/logos/site-logo.svg"
                  alt="logo"
                  height={60}
                  width={60}
                  className="shrink-0"
                />
              </Link>
            </div>

            <div className="flex flex-col h-[90%] justify-between">
              <div
                className="flex flex-col space-y-2 mt-2"
                onClick={handleSheetClose}
              >
                {MenuItem.map((item, index) => {
                  const active =
                    pathname === item.href && pathname.includes(item.href);
                  return (
                    <Link key={index} href={item.href}>
                      <div
                        className={cn(
                          "px-4 py-1 bg-white border border-green/60 flex items-center justify-between rounded-xl w-full",
                          active && "bg-lightGreen",
                          item.label === "Products" && "w-full",
                          item.label === "Contact" && "w-full"
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
              {user ? (
                <div className="flex flex-col gap-3" onClick={handleSheetClose}>
                  <Link href={"/profile"}>
                    <Button className="px-4 py-2 bg-white border border-green/60 hover:bg-white flex items-center justify-between rounded-xl w-full">
                      <span className="text-green text-medium">Profile</span>
                      <Image
                        src="/landing/nav/user.svg"
                        alt="Profile Picture"
                        width={20}
                        height={20}
                        className="shrink-0"
                      />
                    </Button>
                  </Link>
                  <Link href={"/orders"}>
                    <Button className="px-4 py-2 bg-white border border-green/60 hover:bg-white flex items-center justify-between rounded-xl w-full">
                      <span className="text-green text-medium">
                        Track Orders
                      </span>
                      <GiShoppingBag className="size-14 shrink-0 text-green" />
                    </Button>
                  </Link>
                  {user?.role === "ADMIN" && (
                    <Link href={"/admin"}>
                      <Button className="px-4 py-2 bg-white border border-green/60 hover:bg-white flex items-center justify-between rounded-xl w-full">
                        <span className="text-green text-medium">
                          Admin Dashboard
                        </span>
                        <Cog className="size-14 shrink-0 text-green" />
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={onClick}
                    className="px-4 py-2 bg-green hover:bg-green/90 flex items-center justify-between rounded-xl w-full border-none"
                  >
                    <span className="text-white text-medium">Logout</span>
                    <Image
                      src="/landing/nav/logout.svg"
                      alt="Profile Picture"
                      width={18}
                      height={18}
                      className="shrink-0 text-white"
                    />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3" onClick={handleSheetClose}>
                  <Link href={"/auth/login"}>
                    <Button className="px-4 py-2 hover:bg-green/90 bg-green border border-green/60 flex items-center justify-between rounded-xl w-full">
                      <span className="text-white text-medium hover:text-white">
                        LogIn
                      </span>
                      <LogIn className="size-7 shrink-0 text-white" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
