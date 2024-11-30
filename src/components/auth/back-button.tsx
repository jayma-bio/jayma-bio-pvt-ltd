"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full text-sm" asChild>
      <Link href={href} className="font-medium hover:underline underline-offset-1 text-black dark:text-white">{label}</Link>
    </Button>
  );
};
