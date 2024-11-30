import { Input } from "@/components/ui/input";
import { IoIosHeartEmpty } from "react-icons/io";
import CategotyFilter from "./category-filter";
import ProductsList from "./products-list";
import { Category, Products } from "@/types/products-related-types";
import CartActionButton from "./cart-action";
import WhictListButton from "./wishlist-action";

interface ProductsProps {
  categories: Category[];
  products: Products[];
}

const ProductsSection = ({ categories, products }: ProductsProps) => {
  return (
    <section
      id="products"
      className="w-full flex flex-col gap-2 min-h-screen mt-8 md:mt-12 px-5 md:px-10 lg:px-12 max-w-screen-2xl mx-auto"
    >
      <div className="w-full flex items-center justify-center md:justify-end pt-5">
        <div className="flex items-center gap-2 md:gap-5">
          <div className="flex items-center justify-center">
            <CategotyFilter categories={categories} />
          </div>
          <WhictListButton />
          <CartActionButton />
        </div>
      </div>
      <ProductsList products={products} />
    </section>
  );
};

export default ProductsSection;
