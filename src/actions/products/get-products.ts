import { Products } from "@/types/products-related-types";
import qs from "query-string";
import { getUrl } from "../get-url";

interface Query {
  size?: string;
  isFeatured?: boolean;
  category?: string;
}

const getProducts = async (query: Query): Promise<Products[]> => {
  const URL = await getUrl().then((data) => {
    if (data.data) {
      return `${data.data.baseUrl}/${data.data.storeId}/products`;
    }
  });

  if (!URL) {
    throw new Error("URL is undefined");
  }

  const queryString = qs.stringify({
    size: query.size,
    isFeatured: query.isFeatured,
    category: query.category,
  });

  const url = `${URL!}?${queryString}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Products[] = await res.json();
  console.log("Products", data);
  return data;
};

export default getProducts;
