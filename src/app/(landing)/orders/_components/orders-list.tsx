"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserData } from "@/hooks/user-data";
import { Orders } from "@/types/products-related-types";
import { ChevronLeft } from "lucide-react";
import OrderListItem from "./order-list-item";
import Link from "next/link";

interface OrderListpageProps {
  orders: Orders[];
}

const OrderListpage = ({ orders }: OrderListpageProps) => {
  const { user } = useUserData();
  const formatedOrders = orders?.filter((order) => order.userId === user?.id && order.isPaid === true);

  return (
    <section className="w-full min-h-screen h-full flex flex-col max-w-screen-2xl mx-auto gap-3 md:gap-5 px-5 md:px-10 lg:px-14 mt-5 md:mt-12 py-4 md:py-6">
      {formatedOrders?.length > 0 ? (
        <>
          <div className="w-full flex flex-col gap-2 md:gap-4">
            <div className="w-full flex items-center justify-start mt-2 md:mt-4">
              <Link href="/categories">
                <Button
                  className="flex items-center gap-2 text-green"
                  variant="outline"
                >
                  <ChevronLeft className="size-5 shrink-0 text-green" />
                  Back
                </Button>
              </Link>
            </div>
            <div className="w-full flex items-center justify-start mt-2 md:mt-5">
              <h1 className="text-xl md:text-4xl font-medium">Your Orders</h1>
            </div>
            <Separator className="w-full h-[1px] bg-separator" />
          </div>
          <div className="w-full flex flex-col gap-2">
            {formatedOrders.map((order) => (
              <OrderListItem key={order.id} order={order} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex min-h-[70vh] md:min-h-[80vh] items-center justify-center relative">
          <div className="w-full flex flex-col items-center justify-center gap-6 mt-5 md:mt-4">
            <h1 className="text-3xl md:text-4xl font-medium text-green">
              No Records Found
            </h1>
            <img
              src="/order/no-order.svg"
              alt="cart"
              className="w-40 md:w-64 select-none mt-4"
            />
          </div>
          <Link href="/categories" className="absolute top-5 left-0">
            <Button
              className="flex items-center gap-2 text-green"
              variant="outline"
            >
              <ChevronLeft className="size-5 shrink-0 text-green" />
              Back
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default OrderListpage;
