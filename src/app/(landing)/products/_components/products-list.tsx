"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PackageSearch, Pencil } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Products } from "@/types/products-related-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/loader";
import useWishlist from "@/hooks/products/use-wishlist";

interface ProductsListProps {
  products: Products[];
}

// Global No Products Card Component
const GlobalNoProductsCard = () => (
  <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-gray-50 rounded-xl shadow-lg">
    <CardContent className="p-12 flex flex-col items-center justify-center text-center">
      <PackageSearch className="w-24 h-24 text-gray-400 mb-6" />
      <h3 className="text-2xl font-semibold text-gray-700 mb-3">
        No Products Available
      </h3>
      <p className="text-gray-500 text-lg max-w-md">
        We currently don't have any products available. Please check back later
        for our amazing collection!
      </p>
    </CardContent>
  </Card>
);

// Product Card Skeleton Component
const ProductCardSkeleton = ({
  variant,
  isMobile = false,
}: {
  variant: "brewbucha" | "spastudio" | "bacterialcellulose";
  isMobile?: boolean;
}) => {
  if (variant === "spastudio") {
    return (
      <Card className="w-full bg-white overflow-hidden !p-0">
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6`}>
          <Skeleton className={`${isMobile ? "h-64" : "h-96"} w-full`} />
          <div className="flex-1 space-y-6 p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`overflow-hidden bg-white rounded-lg shadow-md ${
        isMobile ? "w-full" : ""
      }`}
    >
      <div className="relative">
        <div className="aspect-square relative">
          <Skeleton className="absolute inset-0 w-full h-full" />
          <div className="absolute top-4 right-4 p-2">
            <Skeleton className="size-10 rounded-full" />
          </div>
        </div>
        <CardContent className="p-4 pb-6">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-2/3 mb-4" />
          <div className="flex items-center justify-between mt-5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

// BrewBucha Card Component
const BrewBuchaCard = ({
  product,
  onClick,
  redirecting,
  addToWishlist,
  wishlist,
}: {
  product: Products;
  redirecting: boolean;
  onClick: (productId: string) => void;
  addToWishlist: (data: Products) => void;
  wishlist: any;
}) => (
  <Card className="overflow-hidden bg-white rounded-lg shadow-md">
    <div className="relative">
      <div className="aspect-square relative">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-4 right-4 p-2 text-green hover:text-green heart-icon bg-lightGreen rounded-full"
        >
          {wishlist.checkItem(product.id) ? (
            <Heart className="size-6 shrink-0 fill-green" />
          ) : (
            <Heart className="size-6 shrink-0 text-green" />
          )}
        </button>
      </div>

      <CardContent className="p-4 pb-6">
        <div className="w-full flex flex-col gap-1 min-h-[9rem]">
          <h3 className="text-lg font-semibold text-green mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-green mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {product.discount > 0 && (
              <span className="text-sm font-medium text-[#CC0C39] pt-1">
                - {product.discount}%
              </span>
            )}
            <div className="flex items-baseline">
              <span className="text-sm font-semibold text-green">Rs</span>
              <span className="text-medium font-semibold text-green ml-1">
                {typeof product.price === "number"
                  ? (
                      product.price -
                      ((product?.discount || 0) / 100) * product.price
                    ).toFixed(2)
                  : ""}
                /-
              </span>
            </div>
          </div>
          <Button
            variant="default"
            disabled={redirecting}
            className="bg-green text-white hover:bg-green/90 px-4 rounded-xl"
            onClick={() => onClick(product.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </div>
  </Card>
);

// SapStudio Card Component
const SapSymphonyCard = ({
  product,
  onClick,
  redirecting,
  addToWishlist,
  wishlist,
}: {
  product: Products;
  onClick: (productId: string) => void;
  redirecting: boolean;
  addToWishlist: (data: Products) => void;
  wishlist: any;
}) => {
  return (
    <Card className="bg-white overflow-hidden !p-0">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-center">
        {/* Left Section with Images */}
        <div className="flex-1 space-y-4 object-contain">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full object-cover h-auto"
          />
        </div>

        {/* Right Section with Content */}
        <div className="flex-1 space-y-4 md:space-y-6 px-3 md:pb-0 md:p-4 pb-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-medium md:font-semibold text-gray-800">
              {product.name}
            </h2>
            <div
              onClick={() => addToWishlist(product)}
              className="flex w-10 h-10 items-center justify-center cursor-pointer bg-lightGreen rounded-full "
            >
              {wishlist.checkItem(product.id) ? (
                <Heart className="size-6 shrink-0 fill-green" />
              ) : (
                <Heart className="size-6 shrink-0 text-green" />
              )}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm md:text-medium">
            {product.description}
          </p>

          <div className="flex items-center justify-between md:pt-4">
            <div className="flex items-center gap-2">
              {product.discount > 0 && (
                <span className="text-sm font-medium text-[#CC0C39] pt-1">
                  - {product.discount}%
                </span>
              )}
              <div className="flex items-baseline">
                <span className="text-lg font-semibold text-green">Rs</span>
                <span className="text-xl font-semibold text-green ml-1">
                  {typeof product.price === "number"
                    ? (
                        product.price -
                        ((product?.discount || 0) / 100) * product.price
                      ).toFixed(0)
                    : ""}
                  /-
                </span>
              </div>
            </div>
            <Button
              onClick={() => onClick(product.id)}
              disabled={redirecting}
              className="bg-green hover:bg-green/90 text-white px-4 md:px-8 py-2 rounded-xl"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Bacterial Cellulose Card Component
const BacterialCelluloseCard = ({
  product,
  onClick,
  redirecting,
  wishlist,
  addToWishlist,
}: {
  product: Products;
  onClick: (productId: string) => void;
  redirecting: boolean;
  wishlist: any;
  addToWishlist: (data: Products) => void;
}) => (
  <Card className="overflow-hidden bg-white rounded-lg shadow-md">
    <div className="relative">
      <div className="aspect-square relative">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-4 right-4 p-2 text-green hover:text-green heart-icon bg-lightGreen rounded-full"
        >
          {wishlist.checkItem(product.id) ? (
            <Heart className="size-6 shrink-0 fill-green" />
          ) : (
            <Heart className="size-6 shrink-0 text-green" />
          )}
        </button>
      </div>

      <CardContent className="p-4 pb-6">
        <div className="w-full flex flex-col gap-1 min-h-[9rem]">
          <h3 className="text-lg font-semibold text-green mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-green mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {product.discount > 0 && (
              <span className="text-sm font-medium text-[#CC0C39] pt-1">
                - {product.discount}%
              </span>
            )}
            <div className="flex items-baseline">
              <span className="text-sm font-semibold text-green">Rs</span>
              <span className="text-medium font-semibold text-green ml-1">
                {typeof product.price === "number"
                  ? (
                      product.price -
                      ((product?.discount || 0) / 100) * product.price
                    ).toFixed(0)
                  : ""}
                /-
              </span>
            </div>
          </div>
          <Button
            variant="default"
            disabled={redirecting}
            className="bg-green text-white hover:bg-green/90 px-4 rounded-xl"
            onClick={() => onClick(product.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </div>
  </Card>
);

const ProductsList = ({ products }: ProductsListProps) => {
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const wishlist = useWishlist();
  const [loadingStates, setLoadingStates] = useState({
    brewbucha: true,
    sapsymphony: true,
    bacterialcellulose: true,
  });
  const [displayedProducts, setDisplayedProducts] = useState<Products[]>([]);

  useEffect(() => {
    // Reset loading states when products change
    setLoadingStates({
      brewbucha: true,
      sapsymphony: true,
      bacterialcellulose: true,
    });

    // Simulate different loading times for each category
    const timers = [
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, brewbucha: false }));
      }, 800),
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, sapsymphony: false }));
      }, 1200),
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, bacterialcellulose: false }));
      }, 1000),
    ];

    setDisplayedProducts(products);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [products]);

  const brewBuchaProducts = displayedProducts.filter(
    (product) => product.category === "BrewBucha" && !product.isArchived
  );
  const sapSymphonyProducts = displayedProducts.filter(
    (product) => product.category === "SapSymphony"
  );
  const bacterialCelluloseProducts = displayedProducts.filter(
    (product) => product.category === "Bacterial Cellulose"
  );

  if (products.length === 0) {
    return (
      <section className="w-full py-16 px-4">
        <GlobalNoProductsCard />
      </section>
    );
  }

  const hanldeProductClick = async (productId: string) => {
    setRedirecting(true);
    try {
      await router.push(`/products/${productId}`);
    } finally {
      setTimeout(() => setRedirecting(false), 3000);
    }
  };

  const addToWishlist = (data: Products) => {
    if (wishlist.checkItem(data.id)) {
      wishlist.removeItem(data.id);
    } else {
      wishlist.addItem(data);
    }
  };

  return (
    <>
      <section className="w-full py-4 md:py-6 flex flex-col gap-7 md:gap-12 mb-6">
        {/* BrewBucha Products */}
        {(loadingStates.brewbucha || brewBuchaProducts.length > 0) && (
          <div className="w-full flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-medium md:font-semibold text-green">
              BrewBucha Beverages
            </h2>

            {/* Mobile View */}
            <div className="md:hidden w-full">
              {loadingStates.brewbucha ? (
                <div className="flex flex-col gap-4">
                  {[1, 2].map((_, index) => (
                    <ProductCardSkeleton
                      key={`brew-mobile-skeleton-${index}`}
                      variant="brewbucha"
                      isMobile={true}
                    />
                  ))}
                </div>
              ) : (
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1}
                  centeredSlides={true}
                  loop={brewBuchaProducts.length > 1}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={false}
                  modules={[Autoplay, Pagination]}
                  className="w-full"
                >
                  {brewBuchaProducts.map((product, index) => (
                    <SwiperSlide key={`brew-mobile-${product.id || index}`}>
                      <BrewBuchaCard
                        product={product}
                        onClick={hanldeProductClick}
                        redirecting={redirecting}
                        addToWishlist={addToWishlist}
                        wishlist={wishlist}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loadingStates.brewbucha
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <ProductCardSkeleton
                        key={`brew-skeleton-${index}`}
                        variant="brewbucha"
                      />
                    ))
                : brewBuchaProducts.map((product, index) => (
                    <BrewBuchaCard
                      key={`brew-${product.id || index}`}
                      product={product}
                      onClick={hanldeProductClick}
                      redirecting={redirecting}
                      addToWishlist={addToWishlist}
                      wishlist={wishlist}
                    />
                  ))}
            </div>
          </div>
        )}

        {/* SapStudio Products */}
        {(loadingStates.sapsymphony || sapSymphonyProducts.length > 0) && (
          <div className="w-full flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-medium md:font-semibold text-green">
              SapStudio
            </h2>

            {/* Mobile View */}
            <div className="md:hidden">
              {loadingStates.sapsymphony ? (
                <div className="flex flex-col gap-4">
                  {[1, 2].map((_, index) => (
                    <ProductCardSkeleton
                      key={`spa-mobile-skeleton-${index}`}
                      variant="spastudio"
                      isMobile={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {sapSymphonyProducts.map((product, index) => (
                    <SapSymphonyCard
                      key={`spa-mobile-${product.id || index}`}
                      product={product}
                      onClick={hanldeProductClick}
                      redirecting={redirecting}
                      addToWishlist={addToWishlist}
                      wishlist={wishlist}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              {loadingStates.sapsymphony ? (
                <ProductCardSkeleton variant="spastudio" />
              ) : (
                sapSymphonyProducts.map((product, index) => (
                  <SapSymphonyCard
                    key={`spa-${product.id || index}`}
                    product={product}
                    onClick={hanldeProductClick}
                    redirecting={redirecting}
                    addToWishlist={addToWishlist}
                    wishlist={wishlist}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Bacterial Cellulose Products */}
        {(loadingStates.bacterialcellulose ||
          bacterialCelluloseProducts.length > 0) && (
          <div className="w-full flex flex-col gap-5 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-medium md:font-semibold text-green">
              Bacterial Cellulose Products
            </h2>

            {/* Mobile View */}
            <div className="md:hidden w-full">
              {loadingStates.bacterialcellulose ? (
                <div className="flex flex-col gap-4">
                  {[1, 2].map((_, index) => (
                    <ProductCardSkeleton
                      key={`cellulose-mobile-skeleton-${index}`}
                      variant="bacterialcellulose"
                      isMobile={true}
                    />
                  ))}
                </div>
              ) : (
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1}
                  centeredSlides={true}
                  loop={bacterialCelluloseProducts.length > 1}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={false}
                  modules={[Autoplay]}
                  className="w-full"
                >
                  {bacterialCelluloseProducts.map((product, index) => (
                    <SwiperSlide
                      key={`cellulose-mobile-${product.id || index}`}
                    >
                      <BacterialCelluloseCard
                        product={product}
                        onClick={hanldeProductClick}
                        redirecting={redirecting}
                        addToWishlist={addToWishlist}
                        wishlist={wishlist}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loadingStates.bacterialcellulose
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <ProductCardSkeleton
                        key={`cellulose-skeleton-${index}`}
                        variant="bacterialcellulose"
                      />
                    ))
                : bacterialCelluloseProducts.map((product, index) => (
                    <BacterialCelluloseCard
                      key={`cellulose-${product.id || index}`}
                      product={product}
                      onClick={hanldeProductClick}
                      redirecting={redirecting}
                      addToWishlist={addToWishlist}
                      wishlist={wishlist}
                    />
                  ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductsList;
