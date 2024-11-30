import getOrders from "@/actions/orders/get-orders";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import OrderListpage from "./_components/orders-list";

export const metadata: Metadata = {
  title: "Orders | Jayma Bio Innovations",
};

export const revalidate = 0;

const OrdersPage = async () => {
  const orders = await getOrders();

  return (
    <MaxWrapper>
      <OrderListpage orders={orders} />
    </MaxWrapper>
  );
};

export default OrdersPage;
