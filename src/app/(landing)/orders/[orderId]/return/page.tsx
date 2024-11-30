import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import getOrder from "@/actions/orders/get-order";
import getCategories from "@/actions/products/get-categories";
import ReturnOrderPage from "./_components/return-order-page";

export const metadata: Metadata = {
  title: "Return Order | Jayma Bio Innovations",
};

interface OrderCancelPageProps {
  params: {
    orderId: string;
  };
}

const OrderCancelPage = async ({ params }: OrderCancelPageProps) => {
  const order = await getOrder(params.orderId);
  const categories = await getCategories();
  return (
    <MaxWrapper>
      <ReturnOrderPage order={order} categories={categories} />
    </MaxWrapper>
  );
};

export default OrderCancelPage;
