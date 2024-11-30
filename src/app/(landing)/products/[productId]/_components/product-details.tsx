"use client";
import { IoStar } from "react-icons/io5";
import { IoStarHalfOutline } from "react-icons/io5";
import ImageGrid from "../../_components/image-grid";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/products/use-carts";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  size: string;
  qty: number;
};

type AboutItem = {
  title: string;
  description: string;
};

type AboutProduct = {
  categoryName: string;
  aboutItems: AboutItem[];
  customerSay: string;
  rating: string;
};
interface ProductDetailsProps {
  prodcut: Product;
  aboutProduct?: AboutProduct;
}

const ProductDetails = ({ prodcut, aboutProduct }: ProductDetailsProps) => {
  const [qty, setQty] = useState<number>(1);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    const cartQty = cart.getItemQuantity(prodcut.id);
    if (cartQty > 0) {
      setQty(cartQty);
    }
  }, [cart, prodcut.id]);

  const handleQty = (value: string) => {
    const num = Number(value);
    setQty(num);

    if (cart.items.some((item) => item.id === prodcut.id)) {
      cart.updateItemQuantity(prodcut.id, num);
    }
  };

  const addToCart = (data: Product) => {
    cart.addItem(data, qty);
  };

  const onClickBuyNow = (data: Product) => {
    cart.buyNow(data, qty);
    router.push("/cart");
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-screen-xl mx-auto">
      <div className="w-full flex flex-col lg:flex-row gap-6 md:gap-10 items-start md:items-center justify-start">
        <div className="w-full flex-1 items-start justify-start">
          <ImageGrid images={prodcut.images} title={prodcut.name} />
        </div>
        <div className="w-full flex flex-col items-start justify-start py-1 md:py-3 md:px-3 gap-4 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-2xl md:text-4xl font-semibold">
              {prodcut.name}
            </h1>
            <p className="text-sm md:text-lg font-medium">
              {prodcut.description}
            </p>
          </div>
          <div className="w-full flex flex-row items-center justify-between py-2 md:py-3 mb-4 md:mb-6">
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-center gap-1">
              {prodcut.discount > 0 && (
                <span className="text-xs md:text-lg font-medium text-[#CC0C39]">
                  {" "}
                  - {prodcut.discount}%
                </span>
              )}
              <h1 className="text-xl md:text-3xl font-medium md:font-semibold text-green flex items-start ml-1 md:ml-2">
                <span className="text-xl -pt-2 pr-1">₹</span>
                {typeof prodcut.price === "number"
                  ? (
                      prodcut.price -
                      ((prodcut?.discount || 0) / 100) * prodcut.price
                    ).toFixed(2)
                  : ""}
                /-
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Select value={qty.toString()} onValueChange={handleQty}>
                <SelectTrigger className="w-[60px] md:w-[80px]">
                  <SelectValue placeholder={qty.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                size={"lg"}
                variant="outline"
                className="px-3 md:px-4 rounded-lg items-center gap-2 text-green hidden md:flex"
                onClick={() => {
                  addToCart(prodcut);
                }}
              >
                Add to cart
                <ShoppingCart className="size-5 shrink-0 text-green" />
              </Button>

              <Button
                size={"lg"}
                variant="outline"
                className="px-4 rounded-lg items-center gap-2 text-green md:hidden"
                onClick={() => {
                  addToCart(prodcut);
                }}
              >
                <ShoppingCart className="size-5 shrink-0 text-green" />
              </Button>

              <Button
                size={"lg"}
                className="px-4 rounded-lg"
                onClick={() => {
                  onClickBuyNow(prodcut);
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[70%] flex flex-col gap-3 md:gap-4 md:mt-5">
        <h1 className="text-xl md:text-2xl font-semibold text-green">
          About this item
        </h1>
        <div className="flex flex-col gap-2 md:gap-4">
          {aboutProduct?.aboutItems.map((item, index) => (
            <li key={index} className="text-sm md:text-medium">
              <span className="font-medium pr-1">{item.title}</span>{" "}
              <span className="font-normal">{item.description}</span>
            </li>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-4">
        <div className="w-full md:w-2/5 flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-green">
            Customer Reviews
          </h1>
          <div className="flex items-center gap-3">
            {Array.from({ length: 5 }, (_, i) => {
              const ratingValue = i + 1;
              const fullRating = parseFloat(aboutProduct?.rating || "0");
              if (ratingValue <= Math.floor(fullRating)) {
                return (
                  <IoStar
                    key={i}
                    className="size-5 md:size-6 fill-rating text-rating shrink-0"
                  />
                );
              } else if (
                ratingValue === Math.floor(fullRating) + 1 &&
                fullRating % 1 !== 0
              ) {
                return (
                  <IoStarHalfOutline
                    key={i}
                    className="size-5 md:size-6 fill-rating text-rating shrink-0"
                  />
                );
              } else {
                return (
                  <IoStar
                    key={i}
                    className="size-5 md:size-6 fill-lightGreen shrink-0"
                  />
                );
              }
            })}
          </div>
          <p className="text-lightText text-medium">
            {aboutProduct?.rating} out of 5
          </p>
        </div>
        <div className="w-full md:w-3/5 flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-green">
            What customers says
          </h1>
          <p className="text-sm md:text-medium">{aboutProduct?.customerSay}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
