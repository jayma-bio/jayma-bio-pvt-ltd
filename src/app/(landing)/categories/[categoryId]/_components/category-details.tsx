"use client";
import ProductsList from "@/app/(landing)/products/_components/products-list";
import { cn } from "@/lib/utils";
import { Category, Products } from "@/types/products-related-types";
import ReactPlayer from "react-player";

interface CategoryDetailsProps {
  category: Category;
  products: Products[];
}

const CategoryDetails = ({ category, products }: CategoryDetailsProps) => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col gap-5 items-start md:items-center justify-center h-full">
        <h1 className="text-3xl md:text-5xl font-semibold">{category.name}</h1>
        <p className="text-sm md:text-lg font-medium text-left md:text-center w-full md:w-[80%]">
          {category.description}
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-4 md:gap-10 py-2 md:py-8 md:mt-6">
        {category?.categoryDesc?.map((desc, index) => (
          <div
            key={index}
            className={cn("w-full flex flex-col md:flex-row gap-4 h-full my-2",
              desc?.video && "md:min-h-[50vh] md:my-5"
            )}
          >
            <div className="w-full md:w-1/2 flex items-center justify-center md:px-5">
              <div className={cn("w-full rounded-xl overflow-hidden",
                desc?.video && "aspect-video min-h-[300px] md:min-h-[350px]"
              )}>
                <ReactPlayer
                  url={desc?.video}
                  width="100%"
                  height="100%"
                  controls
                  autoPlay={false}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex gap-4 items-start md:items-center">
              <p className="text-sm md:text-lg text-green font-medium">
                {desc?.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-full">
        <ProductsList products={products} />
      </div>
    </div>
  );
};

export default CategoryDetails;