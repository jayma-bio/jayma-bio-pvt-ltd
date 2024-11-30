import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import WishlistDetails from "./_components/wishlist-details";
import getCategories from "@/actions/products/get-categories";

export const metadata: Metadata = {
    title: "Wishlist | Jayma Bio Innovations",
  };
  
const WishListPage = async () => {
    const categories = await getCategories();
  return (
    <MaxWrapper>
        <WishlistDetails categories={categories} />
    </MaxWrapper>
  )
}

export default WishListPage