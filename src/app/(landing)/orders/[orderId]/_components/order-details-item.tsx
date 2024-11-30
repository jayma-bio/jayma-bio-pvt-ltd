"use client";

import { Button } from "@/components/ui/button";
import { Products } from "@/types/products-related-types";
import { Info,} from "lucide-react";
import { useEffect, useState } from "react";

interface CartItemProps {
  item: Products;
}

const OrderDetailsItem = ({ item }: CartItemProps) => {
  const [productPrice, setProductPrice] = useState<number>(item.price);
  const qty = item.qty;

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
    <div className="w-full h-full md:h-[100px] flex flex-row items-center md:items-center justify-between gap-3 border-b-[1px] border-separator pb-3 pt-2">
      <div className="flex items-center gap-4">
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-14 md:w-20 h-14 md:h-1/4 rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-sm md:text-medium text-green font-medium w-40 md:w-48 md:-mt-3">
            {item.name}
          </h1>
        </div>
      </div>
      <Button
        className="items-center gap-2  rounded-none border-green pointer-events-none select-none cursor-defaultm hidden md:flex"
        variant="outline"
      >
        <Info className="size-4 md:size-5 shrink-0 text-green" />
        Quantity : {qty}
      </Button>
      <div className="flex flex-col items-center gap-1 md:gap-3">
        <div className="flex items-center flex-col gap-2">
          <h1 className="text-lg font-medium">
            Rs.{" "}
            <span className="text-sm md:text-lg">
              {productPrice.toFixed(2)}
            </span>
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

export default OrderDetailsItem;
