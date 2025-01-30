"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/types/products-related-types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CategoriesPageDetailsProps {
  categories: Category[];
}
const CategoriesPageDetails = ({ categories }: CategoriesPageDetailsProps) => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

 
  return (
    <section
      id="categories"
      className="w-full min-h-screen py-8 md:py-12 mt-4 md:mt-10"
    >
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-12 w-full flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-6 md:gap-12 mb-4 pt-4 md:pt-0">
          <h1 className="text-4xl md:text-6xl font-semibold text-green select-none">
            All products
          </h1>
        </div>
        <div className="w-full grid grid-cols-3 md:grid-cols-9 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden bg-white rounded-lg shadow-md col-span-3"
            >
              <div className="relative p-2">
                <div className="aspect-square relative rounded-lg border overflow-hidden">
                  <img
                    src={category.banner}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>

                <CardContent className="p-4 pb-6">
                  <div className="w-full flex flex-col gap-1 min-h-[8rem]">
                    <h3 className="text-lg font-semibold text-green mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-green mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                  {category.name === "SapSymphony" ? (
                      <Button
                      variant="default"
                      disabled={redirecting}
                      className="bg-green text-white hover:bg-green/90 px-4 rounded-xl"
                      onClick={() => (
                        setRedirecting(true),
                        router.push(`/products/11ZNSYJ369IP31CNBvBH`)
                      )}
                    >
                      View Details
                    </Button>
                  ) : (
                    <Button
                    variant="default"
                    disabled={redirecting}
                    className="bg-green text-white hover:bg-green/90 px-4 rounded-xl"
                    onClick={() => (
                      setRedirecting(true),
                      router.push(`/categories/${category.id}`)
                    )}
                  >
                    View Details
                  </Button>
                  )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPageDetails;
