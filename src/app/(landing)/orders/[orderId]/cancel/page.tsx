import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import getOrder from "@/actions/orders/get-order";
import getCategories from "@/actions/products/get-categories";
import CencelOrderPage from "./_components/cancel-order-page";

export const metadata: Metadata = {
  title: "Cancel Order | Jayma Bio Innovations",
};

interface OrderCancelPageProps {
  params: {
    orderId: string;
  };
}
export const revalidate = 0;

const OrderCancelPage = async ({ params }: OrderCancelPageProps) => {
  const order = await getOrder(params.orderId);
  return (
    <MaxWrapper>
      <CencelOrderPage order={order}  />
    </MaxWrapper>
  );
};

export default OrderCancelPage;
