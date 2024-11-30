import { Category } from "@/types/products-related-types";
import { getUrl } from "../get-url";

const getCategory = async (id: string): Promise<Category> => {
  try {
    const urlData = await getUrl();

    if (!urlData?.data?.baseUrl || !urlData?.data?.storeId) {
      throw new Error("Invalid data received from getUrl");
    }

    const baseUrl = urlData.data.baseUrl;
    const storeId = urlData.data.storeId;
    const categoryUrl = `${baseUrl}/${storeId}/categories/${id}`;

    const categoryRes = await fetch(categoryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!categoryRes.ok) {
      throw new Error(
        `Failed to fetch category. Status: ${categoryRes.status} ${categoryRes.statusText}`
      );
    }

    const data = await categoryRes.json();

    // Ensure the response matches the expected `Category` shape
    return {
      id: data.id || id,
      name: data.name || "Unknown Category",
      description: data.description || "",
      banner: data.banner || "",
      categoryDesc: Array.isArray(data.categoryDesc) ? data.categoryDesc : [],
      billboardId: data.billboardId || "",
      billboardLabel: data.billboardLabel || "",
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error(
      `Error fetching category: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export default getCategory;
