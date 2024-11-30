import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/admin-sidebar-layout/sidebar-toggle";
import Menu from "./menu";

function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 pt-6 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 dark:hidden",
            sidebar?.isOpen === false
              ? "translate-x-1"
              : "translate-x-0 mt-5 mb-4"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logos/site-logo.svg"
              alt="dark-logo"
              className={cn("w-20 hidden", sidebar?.isOpen && "block")}
            />
            <img
              src="/logos/site-logo.svg"
              alt="dark-short-logo"
              className={cn("w-10 block", sidebar?.isOpen && "hidden")}
            />
          </Link>
        </Button>
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 hidden dark:flex",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <img
              src="/logos/white-logo.svg"
              alt="dark-logo"
              className={cn("w-40 hidden", sidebar?.isOpen && "block")}
            />
            <img
              src="/logos/white-short-logo.svg"
              alt="dark-short-logo"
              className={cn("w-10 block", sidebar?.isOpen && "hidden")}
            />
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}

export default Sidebar;
