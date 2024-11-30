import { MaxWrapper } from "@/components/shared/max-wrapper";
import React from "react";
import ProductsSection from "./_components/products-section";
import { Metadata } from "next";
import getCategories from "@/actions/products/get-categories";
import getProducts from "@/actions/products/get-products";

export const metadata: Metadata = {
  title: "Products | Jayma Bio Innovations",
};

interface ProductsPageProps {
  searchParams: {
    size?: string;
    isFeatured?: boolean;
    category?: string;
  };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const categories = await getCategories();
  const products = await getProducts({
    size: searchParams?.size,
    category: searchParams.category,
    isFeatured: searchParams.isFeatured,
  });
  return (
    <MaxWrapper>
      <ProductsSection products={products} categories={categories} />
    </MaxWrapper>
  );
};

export default ProductsPage;
