"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById(
      "loaderVideo"
    ) as HTMLVideoElement;

    if (videoElement) {
      videoElement.onended = () => setLoading(false);
    }

    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative w-full h-full max-w-screen-lg min-h-svh  md:max-h-screen flex items-center justify-center">
        <Image
          src="/logos/site-logo.svg"
          alt="Loader"
          width={150}
          height={150}
          className="animate-zoom hidden md:block"
        />
        <Image
          src="/logos/site-logo.svg"
          alt="Loader"
          width={90}
          height={90}
          className="animate-zoom md:hidden"
        />
      </div>
    </div>
  );
}
