"use client";

import useCart from "@/hooks/products/use-carts";
import useWishlist from "@/hooks/products/use-wishlist";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";

const WhictListButton = () => {
  const [mounted, setMounted] = useState(false);

  const wishlist = useWishlist();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div
      className="relative bg-lightGreen w-12 md:w-14 h-12 md:h-14 rounded-full flex items-center justify-center cursor-pointer"
      onClick={() => {
        router.push("/wishlist");
      }}
    >
      <div className="w-8 md:w-10 flex items-center justify-center cursor-pointer">
        <IoIosHeartEmpty className="size-6 md:size-7 shrink-0 fill-green" />
      </div>
      {wishlist.items.length > 0 && (
        <span className="absolute top-0 flex items-center justify-center text-xs text-white -right-1 bg-green size-5 shrink-0 rounded-full">
          {wishlist.items.length}
        </span>
      )}
    </div>
  );
};

export default WhictListButton;
