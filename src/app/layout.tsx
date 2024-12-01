import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import CookieConsent from "@/components/shared/cookie";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { ModalProvider } from "@/providers/modal-provider";
import ClientUsernameModalSetter from "@/components/renderers/ClientUsernameModalSetter";
import AdSense from "./adsense";

const Loader = dynamic(() => import("@/components/shared/loader"), {
  ssr: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Jayma Bio Innovations",
  description:
    "JAYMA BIO INNOVATIONS: Sustainable health products like kombucha, bacterial cellulose, and the SapStudio device, creating music from plants. Building a meaningful digital connection with our audience.",
  icons: {
    icon: "/logos/logo.png",
    apple: "/logos/logo.png",
  },
  manifest: "./manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const showUsernameModal =
    session?.user.username === null || session?.user.username === undefined;

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <AdSense  pId="8331809888604693"/>
          <style>{`
          #content { display: none; }
          #loader { display: flex; }
        `}</style>
        </head>
        <body
          className={cn(`scroll-smooth overflow-x-hidden `, poppins.className)}
        >
          <div
            id="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <Loader />
          </div>
          <div id="content">
            {showUsernameModal && <ClientUsernameModalSetter />}
            <ModalProvider />
            <NextTopLoader color="#0D2A25" />
            {children}
            <Toaster />
          </div>

          <Script id="show-page" strategy="afterInteractive">
            {`
            function showContent() {
              document.getElementById('loader').style.display = 'none';
              document.getElementById('content').style.display = 'block';
            }
            setTimeout(showContent, 2000);
          `}
          </Script>
          <CookieConsent />
        </body>
      </html>
    </SessionProvider>
  );
}
