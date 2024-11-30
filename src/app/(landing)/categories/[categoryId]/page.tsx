import getCategory from "@/actions/products/get-category";
import getProducts from "@/actions/products/get-products";
import CategoryDetails from "./_components/category-details";
import { Metadata } from "next";

interface CategoryDetailsProps {
  params: {
    categoryId: string;
  };
}
export const metadata: Metadata = {
  title: "Product | Jayma Bio Innovations",
};

const CategoryDetailsPage = async ({ params }: CategoryDetailsProps) => {
  const category = await getCategory(params.categoryId);
  const products = await getProducts({
    category: category.name,
  });
  return (
    <section
      id="category"
      className="w-full min-h-screen py-6 md:py-12 mt-4 md:mt-6 px-5 md:px-10 lg:px-12 max-w-screen-2xl mx-auto"
    >
      <CategoryDetails category={category} products={products} />
    </section>
  );
};

export default CategoryDetailsPage;
