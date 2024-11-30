import { Products } from "@/types/products-related-types";
import { getUrl } from "../get-url";

const getProduct = async (id: string): Promise<Products> => {
  const URL = await getUrl().then((data) => {
    if (data.data) {
      return `${data.data.baseUrl}/${data.data.storeId}/products`;
    }
  });

  if (!URL) {
    throw new Error("URL is undefined");
  }

  try {
    // Add timestamp to URL to prevent caching
    const timestampedURL = `${URL!}/${id}?timestamp=${Date.now()}`;

    const res = await fetch(timestampedURL, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const data = await res.json();

    // Ensure we have proper data structure
    return {
      ...data,
      id: data.id || id,
      name: data.name || "",
      description: data.description || "",
      price: Number(data.price) || 0,
      discount: Number(data.discount) || 0,
      images: Array.isArray(data.images) ? data.images : [],
      isFeatured: Boolean(data.isFeatured),
      isArchived: Boolean(data.isArchived),
      category: data.category || "",
      size: data.size || "",
      qty: Number(data.qty) || 0,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export default getProduct;
