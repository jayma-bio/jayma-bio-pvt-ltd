"use client";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import CartDetails from "./_components/cart-details";
import { useUserData } from "@/hooks/user-data";

const CartPage = () => {
  const { user } = useUserData();
  return (
    <MaxWrapper>
      <CartDetails userId={user?.id} />
    </MaxWrapper>
  );
};

export default CartPage;
