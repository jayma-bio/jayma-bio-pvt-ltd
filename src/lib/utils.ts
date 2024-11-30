import { options } from "@/app/(routes)/admin/_components/events/event-tags";
import { CategoryBasedProductDetails } from "@/constants/constant-product-details/details";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToNext = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

export function getProductAboutDetailsByCategory(categoryName: string) {
  return CategoryBasedProductDetails.find(
    (product) => product.categoryName === categoryName
  );
}

export function tagLabelByValue(value: string): string {
  const tag = options.find((option) => option.value === value);
  return tag ? tag.label : "";
}

export function formatDate(dateString: string, choice: number) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  // Add ordinal suffix
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  switch (choice) {
    case 1:
      return `${day}${getOrdinalSuffix(day)} ${month}`;
    case 2:
      return `${day}${getOrdinalSuffix(day)} ${month}, ${date.getFullYear()}`;
  }
}
