"use client";

import useCart from "@/hooks/products/use-carts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartActionButton = () => {
  const [mounted, setMounted] = useState(false);

  const cart = useCart();
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
        router.push("/cart");
      }}
    >
      <div className="w-8 md:w-10 flex items-center justify-center cursor-pointer">
        <img
          src="/products/cart.svg"
          alt="cart-icon"
          className="size-5 md:size-7 shrink-0"
        />
      </div>
      {cart.items.length > 0 && (
        <span className="absolute top-0 flex items-center justify-center text-xs text-white -right-1 bg-green size-5 shrink-0 rounded-full">
          {cart.items.length}
        </span>
      )}
    </div>
  );
};

export default CartActionButton;
