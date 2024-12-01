import AnimatedButton from "@/components/animation/button";
import { Button } from "@/components/ui/button";
import { LatestProductsDetails } from "@/constants/landing/latest-products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const LatestProductsLg = () => {
  return (
    <div className="hidden md:flex flex-col w-full">
      {LatestProductsDetails.map((product, index) => (
        <div key={index} className="flex flex-col gap-8 items-start py-5">
          <div className="flex gap-2 rounded-3xl border bg-green px-16 py-3">
            <span className="text-white text-xl">0{index + 1}.</span>
            <span className="text-white text-xl">{product.name}</span>
          </div>
          <div
            className={cn(
              "w-full flex gap-8",
              index % 2 !== 0 && "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "w-[50%] flex items-center justify-center object-contain",
                index % 2 !== 0 && "justify-items-end"
              )}
            >
              <Image
                key={index}
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={50}
                className="object-cover h-[94%] rounded-3xl"
              />
            </div>
            <div className="w-[45%] flex flex-col justify-center gap-8">
              <h1 className="text-green text-3xl font-bold-custom">
                {product.name}
              </h1>
              <p className="text-green lg:text-[20px] leading-[1.3rem] lg:leading-[1.8rem]">
                {product.desc}
              </p>
              <Link href={product.url}>
                <Button
                  className="bg-green hover:bg-green/90 rounded-full text-lg"
                  size="lg"
                >
                  Know More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LatestProductsSm = () => {
  return (
    <div className="md:hidden w-full">
      {LatestProductsDetails.map((product, index) => (
        <div key={index} className="flex flex-col gap-8 items-start py-5">
          <div className="flex gap-2 rounded-3xl border border-green px-6 py-1.5">
            <span className="text-green text-lg">0{index + 1}.</span>
            <span className="text-green text-lg">{product.name}</span>
          </div>
          <div className="w-full flex flex-col gap-6 bg-white rounded-3xl px-4 py-4">
            <div className="w-full flex items-center justify-center">
              <Image
                key={index}
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={100}
                className={cn(
                  "h-[80%] w-full rounded-3xl",
                  index % 2 === 0 && "rounded-[25px]"
                )}
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-5 md:px-10">
              <h1 className="text-green text-2xl font-bold-custom">
                {product.name}
              </h1>
              <p className="text-green text-sm md:text-[15px] leading-[1.3rem] md:leading-[1.8rem] text-center">
                {product.desc}
              </p>
              <Link href={product.url}>
                <Button
                  className="bg-green hover:bg-green/90 rounded-full"
                  size="lg"
                >
                  Know More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LatestProducts = () => {
  return (
    <section className="w-full bg-[#D9E6BA] rounded-b-[30px] lg:rounded-b-[60px] pb-5 mb-5">
      <div className="w-full px-5 lg:px-14 min-h-screen flex flex-col max-w-screen-2xl mx-auto h-full pt-5 gap-4 md:gap-8">
        <div className="flex w-full mt-2 md:mt-8">
          <h1 className="text-3xl leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-medium tracking-tight text-green">
            Latest Products
          </h1>
        </div>
        <div className="w-full">
          <LatestProductsLg />
          <LatestProductsSm />
        </div>
        <div className="flex items-center justify-center pb-5">
          <AnimatedButton buttonText="All Products" link={"/categories"} />
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
