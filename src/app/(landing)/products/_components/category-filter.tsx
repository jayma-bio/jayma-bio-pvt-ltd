"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/products-related-types";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

interface CategotyFilterProps {
  categories: Category[];
}

const CategotyFilter = ({ categories }: CategotyFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // Update local state when URL changes
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const handleSelect = (value: string) => {
    if (value === "clear") {
      // Clear all search params and redirect to base products page
      router.push("/products");
      setCategory("");
      return;
    }

    const currentParams = Object.fromEntries(searchParams.entries());

    if (currentParams.category === value) {
      // If clicking the same category, remove it
      delete currentParams.category;
      setCategory("");
    } else {
      // Otherwise, set the new category
      currentParams.category = value;
      setCategory(value);
    }

    const href = qs.stringifyUrl({
      url: "/products",
      query: currentParams,
    });

    router.push(href);
  };

  if (!categories) {
    return (
      <div className="w-[160px] md:w-[250px] h-9 md:h-10 rounded-full flex items-center justify-center border border-green/40">
        <Loader2 className="size-6 shrink-0 text-green animate-spin" />
      </div>
    );
  }

  return (
    <Select value={category} onValueChange={handleSelect}>
      <SelectTrigger className="w-[250px] px-5 border border-green/50 rounded-full focus:ring-0">
        <SelectValue placeholder="Sort by Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="clear" className="text-red-500">
          Clear filter
        </SelectItem>
        {categories.map((category, index) => (
          <SelectItem value={category.name} key={index}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategotyFilter;
