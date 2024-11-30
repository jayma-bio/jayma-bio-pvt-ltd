import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import getCategories from "@/actions/products/get-categories";
import getProducts from "@/actions/products/get-products";
import CategoriesPageDetails from "./_components/categories-page-detail";

export const metadata: Metadata = {
  title: "Products | Jayma Bio Innovations",
};

const CategoriesPage = async () => {
  const categories = await getCategories();
  return (
    <MaxWrapper>
      <CategoriesPageDetails categories={categories} />
    </MaxWrapper>
  );
};

export default CategoriesPage;
