import { Orders } from "@/types/products-related-types";
import { getUrl } from "../get-url";

const getOreders = async (): Promise<Orders[]> => {
  try {
    const URL = await getUrl().then((data) => {
      if (data.data) {
        return `${data.data.baseUrl}/${data.data.storeId}/orders`;
      }
    });

    if (!URL) {
      throw new Error("URL is undefined");
    }

    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    //
    return res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export default getOreders;
