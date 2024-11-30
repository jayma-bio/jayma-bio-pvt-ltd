import { cn } from "@/lib/utils";
import { Orders } from "@/types/products-related-types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface OrderListItemProps {
  order: Orders;
}

const OrderListItem = ({ order }: OrderListItemProps) => {
  const orderItems = order.orderItems;

  const firstOrderItemName =
    orderItems && orderItems.length > 0
      ? orderItems[0].name
      : order.cancelled_items[0].name;
  const firstOrderItemImage =
    orderItems && orderItems.length > 0
      ? orderItems[0].images[0].url
      : order.cancelled_items[0].images[0].url;
  const orderId = order.id;

  return (
    <Link href={`/orders/${orderId}`}>
      <div className="w-full  py-4 px-4 flex items-center border-b-[1px] border-separator justify-between cursor-pointer hover:bg-separator/40 transition duration-300 rounded-lg">
        <div className="flex items-center gap-3 justify-start">
          <img
            src={firstOrderItemImage}
            alt={firstOrderItemName}
            className="w-10 md:w-20 aspect-square rounded-md"
          />
          <div className="flex flex-col gap-2">
            <h1 className={cn("text-sm md:text-lg font-medium text-green w-40 md:w-56", orderItems.length > 1 && "md:w-64")}>
              {orderItems.length > 1
                ? `${firstOrderItemName} & ${orderItems.length - 1} more`
                : firstOrderItemName}
            </h1>

            <h1  className={cn(
            "text-xs md:text-sm font-medium",
            order.order_status === "Order Confirmed" && "text-emerald-600",
            order.order_status === "Order Delivered" && "text-teal-700",
            order.order_status === "Order Cancelled" && "text-red-600",
            order.order_status === "Order Processing" && "text-yellow-600",
            order.order_status === "Order Delivering" && "text-orange-500",
            order.order_status === "Order Shipped" && "text-blue-600",
            order.order_status === "Payment Successful" && "text-emerald-400",
            order.order_status === "Payment Failed" && "text-red-600",
            order.order_status === "Payment Processing" && "text-yellow-600",
            order.order_status === "Return Requested" && "text-yellow-600",
          )}>
              ({order.order_status})
            </h1>
          </div>
        </div>
        <Link href={`/orders/${orderId}`}>
          <div className="flex items-center justify-end gap-2 group">
            <h1 className="text-sm md:text-lg font-medium text-green flex items-center gap-2 cursor-pointer">
              View Details
              <ChevronRight className="size-4 md:size-5 shrink-0 text-green group-hover:translate-x-2 transition duration-300" />
            </h1>
          </div>
        </Link>
      </div>
    </Link>
  );
};

export default OrderListItem;
