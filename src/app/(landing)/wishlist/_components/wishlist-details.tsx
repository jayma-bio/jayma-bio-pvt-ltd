"use client";

import useWishlist from "@/hooks/products/use-wishlist";
import ProductsList from "../../products/_components/products-list";
import CategotyFilter from "../../products/_components/category-filter";
import WhictListButton from "../../products/_components/wishlist-action";
import CartActionButton from "../../products/_components/cart-action";
import { Category } from "@/types/products-related-types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface WishlistDetailsProps {
  categories: Category[];
}

const WishlistDetails = ({ categories }: WishlistDetailsProps) => {
  const wishlist = useWishlist();
  const products = wishlist.items;

  return (
    <section
      id="products"
      className="w-full flex flex-col gap-4 min-h-screen mt-8 md:mt-12 px-5 md:px-10 lg:px-12 max-w-screen-2xl mx-auto"
    >
      {products.length > 0 && (
        <div className="w-full flex items-center justify-center md:justify-end pt-5">
        <div className="flex items-center gap-2 md:gap-5">
          <div className="flex items-center justify-center">
            <CategotyFilter categories={categories} />
          </div>
          <WhictListButton />
          <CartActionButton />
        </div>
      </div>
      )}
      {products.length > 0 ? (
        <ProductsList products={products} />
      ) : (
        <div className="w-full flex pt-5 md:pt-20 h-full min-h-[70vh] md:min-h-[50vh] items-center justify-center">
          <div className="w-full flex flex-col gap-5 md:gap-8 pt-10 md:pt-0">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
              <h1 className="text-3xl md:text-4xl font-medium text-green">
                Your Wishlist Is Empty
              </h1>
              <img
                src="/cart/empty-wishlist.svg"
                alt="cart"
                className="w-40 md:w-60 select-none md:-mt-4"
              />
            </div>
            <div className="w-fill flex items-center justify-center mt-7">
              <Link href="/categories">
                <Button
                  className="w-[240px] md:w-[280px] flex items-center gap-2 border-none"
                  variant="ghost"
                >
                  <ChevronLeft className="size-6 shrink-0 text-green" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WishlistDetails;
