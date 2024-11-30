import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Cancelled | Jayma Bio Innovations",
};

const CheckoutCancelledPage = () => {
  return (
    <MaxWrapper>
      <div className="w-full flex pt-5 md:pt-20 h-full min-h-[70vh] md:min-h-[80vh] items-center justify-center">
        <div className="w-full flex flex-col gap-5 md:gap-8 pt-10 md:pt-0">
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl md:text-4xl font-medium text-center text-green w-[60%] md:w-full">
              Your order has been cancelled !
            </h1>
            <img
              src="/checkout/cancelled.svg"
              alt="cart"
              className="w-44 md:w-72 select-none mt-5 md:mt-8"
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
    </MaxWrapper>
  );
};

export default CheckoutCancelledPage;
