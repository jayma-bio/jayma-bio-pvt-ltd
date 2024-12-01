import getProduct from "@/actions/products/get-product";
import getProducts from "@/actions/products/get-products";
import ProductDetails from "./_components/product-details";
import RecommendedProducts from "./_components/recommended-products";
import { getProductAboutDetailsByCategory } from "@/lib/utils";
import { Metadata } from "next";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import CartActionButton from "../_components/cart-action";
import WhictListButton from "../_components/wishlist-action";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export const metadata: Metadata = {
  title: `Product | Jayma Bio Innovations`,
};

const SingleProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);

  let suggestedProducts = await getProducts({
    category: product.category,
  });

  suggestedProducts = suggestedProducts.filter(
    (suggestedProduct) => suggestedProduct.id !== product.id
  );

  const aboutProduct = getProductAboutDetailsByCategory(product.category);
  return (
    <MaxWrapper>
      <section className="w-full h-full flex flex-col mt-6 md:mt-8 gap-5 min-h-screen px-4 md:px-10 lg:px-14 max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-end pt-3 md:pt-5">
          <div className="flex items-center gap-3 md:gap-5">
            <WhictListButton />
            <CartActionButton />
          </div>
        </div>
        <ProductDetails prodcut={product} aboutProduct={aboutProduct} />
        {suggestedProducts.length > 0 && (
          <RecommendedProducts products={suggestedProducts} />
        )}
      </section>
    </MaxWrapper>
  );
};

export default SingleProductPage;
