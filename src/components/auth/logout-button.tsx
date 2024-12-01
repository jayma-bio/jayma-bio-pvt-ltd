"use client";

import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router= useRouter();
  const onClick = () => {
    logout();
    window.location.reload();

  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}