import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Category } from "@/types/products-related-types";
import Link from "next/link";

interface ProductsPageProps {
  categories: Category[];
}
const ProductsPageDetails = ({ categories }: ProductsPageProps) => {
  return (
    <section
      id="categories"
      className="w-full min-h-screen py-8 md:py-12 mt-4 md:mt-10"
    >
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-12 w-full flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col items-center gap-6 md:gap-12 mb-8 pt-4 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-semibold text-green select-none">
            All products
          </h1>
        </div>
        <div className="w-full grid grid-cols-9 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="col-span-3 flex flex-col gap-4 px-3 py-4 shadow-md z-20"
            >
              <div className="object-contain rounded-xl overflow-hidden">
                <img
                  src={category.banner}
                  alt="banner"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <CardTitle className="text-lg font-semibold">
                  {category.name}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </div>
              <div className="w-full flex items-center justify-end">
                <Link href={`/category/${category.id}`}>
                  <Button className="rounded-xl" size={"sm"}>
                    View Products
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPageDetails;
