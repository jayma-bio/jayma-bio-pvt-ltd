import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

import { cn } from "@/lib/utils";
import Script from "next/script";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={cn(
        "antialiased scroll-smooth overflow-x-hidden w-full min-h-screen bg-white"
      )}
    >
      <Navbar />
      <div className="w-full h-full flex flex-col gap-5 items-center mt-14">
        {children}
      </div>
      <Footer />
    </main>
  );
}
