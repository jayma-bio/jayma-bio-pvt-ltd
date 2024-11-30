import getOreder from "@/actions/orders/get-order";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import OrderDetails from "./_components/order-details";
import { Metadata } from "next";
import { getRefunds } from "@/actions/refund/get-refunds";

interface OrderDetailsPageProps {
  params: {
    orderId: string;
  };
}

export const metadata: Metadata = {
  title: "Orders Details | Jayma Bio Innovations",
};

export const revalidate = 0;

const OrderDetailsPage = async ({ params }: OrderDetailsPageProps) => {
  const order = await getOreder(params.orderId);
  const returns = await getRefunds();

  if (!order) {
    window.location.pathname = "/orders";
  }

  return (
    <MaxWrapper>
      <OrderDetails order={order} returns={returns.refund} />
    </MaxWrapper>
  );
};

export default OrderDetailsPage;
