import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  theme,
  className,
}: {
  theme?: "dark" | "light" | null | undefined;
  className?: string;
}) => {
  return (
    <Link href="/">
      <div
        className={cn(
          className,
          "object-contain pointer-events-none select-none"
        )}
      >
        <Image
          src={
            theme === "dark" ? "/logos/dark-logo.svg" : "/logos/white-logo.svg"
          }
          alt="ExLan"
          width={160}
          height={100}
          className="hidden md:block"
        />
        <Image
          src={
            theme === "dark" ? "/logos/dark-logo.svg" : "/logos/white-logo.svg"
          }
          alt="ExLan"
          width={130}
          height={100}
          className="md:hidden"
        />
      </div>
    </Link>
  );
};
