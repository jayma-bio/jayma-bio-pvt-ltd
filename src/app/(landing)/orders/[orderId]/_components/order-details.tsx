"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Orders } from "@/types/products-related-types";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  XCircle,
} from "lucide-react";
import OrderDetailsItem from "./order-details-item";
import { usePaymentManagement } from "@/hooks/use-payment-management";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import OrderStatusProgressBar from "./order-status-bar";
import Link from "next/link";
import useCart from "@/hooks/products/use-carts";
import { useRouter } from "next/navigation";
import { PiContactlessPaymentBold } from "react-icons/pi";
import { toast } from "sonner";
import { getUrl } from "@/actions/get-url";
import { RefundPolicy } from "@/app/(routes)/admin/_components/policy/policy-component";


interface OrderDetailsPageProps {
  order: Orders;
  returns?: RefundPolicy;
}
export const revalidate = 0;

const OrderDetails = ({ order, returns }: OrderDetailsPageProps) => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();
  const cart = useCart();
  const { shipping, tax } = usePaymentManagement();
  const priceAfterDiscount = useMemo(() => {
    return order.orderItems.reduce((total: number, item) => {
      const price = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + price * Number(item.qty);
    }, 0);
  }, [order.orderItems]);

  const onBuyAgain = () => {
    order.orderItems.forEach((item) => {
      cart.addItem(item);
    });
    router.push("/cart");
  };

  const onClikAgainPay = async (data: Orders) => {
    setCheckoutLoading(true);
    try {
      const storeId = await getUrl().then((data) => {
        if (data.data) {
          return `${data.data.storeId}`;
        }
      });
      const PAYMENT_URL = new URL(process.env.NEXT_PUBLIC_PAYMENT_URL! || "");
      PAYMENT_URL.searchParams.append("session_id", data.session_id);
      PAYMENT_URL.searchParams.append("store_id", storeId!);
      PAYMENT_URL.searchParams.append("order_id", data.id);
      router.push(PAYMENT_URL.toString());
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      router.replace("/checkout-failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen h-full flex flex-col max-w-screen-2xl mx-auto gap-3 md:gap-5 px-5 md:px-10 lg:px-14 mt-5 md:mt-8 py-4 md:py-6">
      <div className="w-full flex flex-col gap-2 md:gap-4">
        <div className="w-full flex items-center justify-start mt-2 md:mt-4">
          <Link href="/orders">
            <Button
              className="flex items-center gap-2 text-green"
              variant="outline"
            >
              <ChevronLeft className="size-5 shrink-0 text-green" />
              Back
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-3/5 flex flex-col gap-8 pt-3 md:pt-5 md:px-3">
          {order?.orderItems?.length > 0 && (
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl font-medium text-green">
                Ordered Items
              </h1>
              <Separator className="h-[1px] w-full bg-separator" />
              <div className="w-full flex flex-col gap-2">
                {order.orderItems.map((orderItem) => (
                  <OrderDetailsItem key={orderItem.id} item={orderItem} />
                ))}
              </div>
            </div>
          )}
          {order?.cancelled_items?.length > 0 && (
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl font-medium text-green">
                Cancelled Items
              </h1>
              <Separator className="h-[1px] w-full bg-separator" />
              <div className="w-full flex flex-col gap-2">
                {order.cancelled_items.map((cancelledItem) => (
                  <OrderDetailsItem
                    key={cancelledItem.id}
                    item={cancelledItem}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <Separator
          orientation="vertical"
          className="min-h-[300px] h-full w-[1px] bg-separator hidden md:block"
        />
        <div className="w-full md:w-2/5 flex flex-col gap-4 pt-3 md:pt-5 md:px-3">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-medium text-green">
              Order Summary
            </h1>
            {order.refundableamount === order.amount ||
              priceAfterDiscount === 0 ? (
              ""
            ) : (

              <>
                <Separator className="h-[1px] w-full bg-separator" />
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-green/50">Subtotal</h1>
                    <h1 className="text-medium text-green font-medium">
                      <span className="mr-2">Rs</span>
                      {priceAfterDiscount.toFixed(2)}
                    </h1>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-green/50">Shipping</h1>
                    <h1 className="text-medium text-green">
                      {shipping && shipping !== 0
                        ? `Rs. ${shipping} /-`
                        : "Free"}
                    </h1>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-green/50">Tax</h1>
                    <h1 className="text-medium text-green">
                      {tax ? `Rs. ${tax} %` : "Free"}
                    </h1>
                  </div>
                </div>
              </>

            )}
            <Separator className="h-[1px] w-full bg-separator" />
            <div className="w-full flex items-center justify-between">
              {order.order_status === "Payment Processing" ? (
                <h1 className="text-lg text-green">Total Payble Amount</h1>
              ) : (
                <h1 className="text-lg text-green">Total Paid Amount</h1>
              )}
              <h1 className="text-lg text-green">{order.amount.toFixed(2)}</h1>
            </div>
            {order.order_status === "Return Requested" && (
              <>
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-green">Refundable Amount</h1>

                    <h1 className="text-lg text-green">{order.amount}</h1>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground mt-2">
                    Your Return Request will be processed within 4-5 business
                  </p>
                </div>
              </>
            )}
            {order.refundableamount && order.refundableamount > 0 && (
              <div className="w-full flex flex-col gap-3">
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-lg text-green">Refundable Amount</h1>

                  <h1 className="text-lg text-green">
                    {order.refundableamount}
                  </h1>
                </div>
                {order?.orderItems?.length > 0 ? (
                  <p className="text-xs md:text-sm text-muted-foreground mt-2">
                    Your Canceled items refund will be processed within 4-5
                    business
                  </p>
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground mt-2">
                    Your order has been cancelled. Your refund will be processed
                    within 4-5 business days.
                  </p>
                )}
              </div>
            )}
            <Button
              disabled={checkoutLoading}
              onClick={() => onClikAgainPay(order)}
              className={cn(
                "flex items-center gap-2 mt-2 md:mt-3 cursor-default pointer-events-none select-none",
                order?.order_status === "Payment Processing" &&
                "pointer-events-auto select-all cursor-pointer",
                order?.order_status === "Payment Failed" ||
                  order?.order_status === "Order Cancelled"
                  ? "bg-red-600"
                  : "bg-emerald-600",
                order?.order_status === "Payment Processing" &&
                "bg-yellow-600 hover:bg-yellow-700",
                order?.order_status === "Return Requested" &&
                "bg-yellow-600 hover:bg-yellow-700"
              )}
            >
              {order?.order_status === "Payment Processing"
                ? "Continue Payment"
                : order?.order_status}
              {order?.order_status === "Payment Failed" ||
                order?.order_status === "Order Cancelled" ? (
                <>
                  <XCircle className="size-4 md:size-5 shrink-0 text-white" />
                </>
              ) : order?.order_status === "Payment Processing" ? (
                <>
                  <PiContactlessPaymentBold className="size-4 md:size-6 shrink-0 text-white" />
                </>
              ) : (
                <>
                  <CheckCircle className="size-4 md:size-5 shrink-0 text-white" />
                </>
              )}
              {checkoutLoading && (
                <Loader2 className="size-4 md:size-5 shrink-0 text-white animate-spin" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {order.order_status !== "Payment Processing" && (
        <>
          <Separator className="w-full h-[1px] bg-separator mt-2" />
          <div
            className="w-full flex items-center justify-between pt-3 cursor-pointer group"
            onClick={onBuyAgain}
          >
            <Button
              className="text-lg md:text-xl flex items-center gap-2"
              variant="ghost"
            >
              <RotateCcw className="text-green size-5 shrink-0 -rotate-90" />{" "}
              Buy Again
            </Button>
            <ChevronRight className="size-6 md:size-7 shrink-0 text-green group-hover:translate-x-2 transition  duration-300" />
          </div>
          <Separator className="w-full h-[1px] bg-separator mt-2" />
        </>
      )}
      {order.order_status == "Payment Failed" ||
        order.order_status === "Payment Processing" ||
        order?.order_status === "Order Cancelled" ? (
        ""
      ) : (
        <>
          <div className="w-full flex flex-col gap-5 mt-4">
            <div className="w-full flex items-center justify-start">
              <h1 className="text-2xl md:text-3xl font-medium text-green">
                Order Status
              </h1>
            </div>
            <OrderStatusProgressBar order_status={order.order_status} />

            {order.order_status !== "Order Shipped" &&
              order.order_status !== "Order Delivered" && (
                <div className="w-full flex items-center justify-end md:mt-4">
                  <Link href={`/orders/${order?.id}/cancel`}>
                    <Button className="w-[160px] md:w-[200px] bg-green hover:bg-green/90 text-medium text-white h-8 md:h-12">
                      Cancel Order
                    </Button>
                  </Link>
                </div>
              )}
            {order.order_status === "Order Delivered" && (
              <div className="w-full flex items-center justify-end md:mt-4">
                <Link href={`${returns?.link}`}>
                  <Button className="w-[160px] md:w-[200px] bg-green hover:bg-green/90 text-medium text-white h-8 md:h-12">
                    Return Order
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      <div className="w-full flex items-center justify-center mt-6 md:mt-14">
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
    </section>
  );
};

export default OrderDetails;
