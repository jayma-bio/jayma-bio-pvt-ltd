"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/products/use-carts";
import { Products } from "@/types/products-related-types";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartItemProps {
  item: Products;
}

const CartItem = ({ item }: CartItemProps) => {
  const [productPrice, setProductPrice] = useState<number>(item.price);
  const [qty, setQty] = useState(item.qty ?? 1);

  const cart = useCart();

  const increaseQuantity = () => {
    setQty(qty + 1);
    cart.updateItemQuantity(item.id, qty + 1);
  };

  const decreaseQuantity = () => {
    setQty(qty - 1);
    cart.updateItemQuantity(item.id, qty - 1);
  };

  const handleRemove = (id: string) => {
    if (id) {
      cart.removeItem(item.id);
    } else {
      toast.error("Item not found");
    }
  };

  const calculatePriceWithDiscount = (product: Products) => {
    const price = product.price;
    const discount = product.discount;
    return discount ? price - (price * discount) / 100 : price;
  };

  useEffect(() => {
    const finalPrice = calculatePriceWithDiscount(item);
    setProductPrice(finalPrice);
  }, [item.id, item.price, item.discount]);

  return (
    <div className="w-full h-full md:h-[100px] flex flex-col md:flex-row items-start justify-between gap-3 border-b-[1px] border-green/40 pb-3 pt-2">
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger className="border-none">
            <RxCross1
              className="size-4 md:size-5 shrink-0 fill-green/60 cursor-pointer border-none"
              onClick={() => {
                handleRemove(item.id);
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove Item</p>
          </TooltipContent>
        </Tooltip>
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-14 md:w-20 h-14 md:h-1/4 rounded-md ml-2 md:ml-4"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-sm md:text-medium text-green font-medium w-full md:w-48 md:-mt-3">
            {item.name}
          </h1>
        </div>
      </div>
      <div className="flex items-center -ml-2 gap-1 md:gap-2">
        <Button
          disabled={qty === 1}
          size={"icon"}
          variant={"ghost"}
          onClick={decreaseQuantity}
          className="border-none"
        >
          <MinusCircle className="size-3 md:size-6 shrink-0 text-green" />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="text-sm md:text-lg font-medium cursor-pointer pointer-events-none border-none"
        >
          {qty}
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={increaseQuantity} className="border-none">
          <PlusCircle className="size-3 md:size-6 shrink-0 text-green" />
        </Button>
        <div className="flex items-center flex-row md:flex-col gap-2 md:mt-3">
          <h1 className="text-lg font-medium">
            Rs. <span className="text-sm md:text-lg">{productPrice.toFixed(2)}</span>
          </h1>
          <h1 className="text-xs font-medium text-lightText">
            Total:{" "}
            <span className="text-xs">{(productPrice * qty).toFixed(2)}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
