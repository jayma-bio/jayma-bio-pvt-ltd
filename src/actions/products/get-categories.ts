import { Category } from "@/types/products-related-types";
import { getUrl } from "../get-url";

const getCategories = async (): Promise<Category[]> => {
  try {
    const URL = await getUrl().then((data) => {
      if (data.data) {
        return `${data.data.baseUrl}/${data.data.storeId}/categories`;
      }
    });
    
    if (!URL) {
      throw new Error("URL is undefined");
    }

    const categoryRes = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!categoryRes.ok) {
      throw new Error(
        `Failed to fetch categories: ${categoryRes.status} ${categoryRes.statusText}`
      );
    }

    return await categoryRes.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getCategories;
