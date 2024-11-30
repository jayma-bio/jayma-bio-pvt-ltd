import { Products } from "@/types/products-related-types";
import React from "react";
import ProductsList from "../../_components/products-list";

interface RecommendedProductsProps {
  products: Products[];
}

const RecommendedProducts = ({ products }: RecommendedProductsProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center py-4">
      <ProductsList products={products} />
    </div>
  );
};

export default RecommendedProducts;
