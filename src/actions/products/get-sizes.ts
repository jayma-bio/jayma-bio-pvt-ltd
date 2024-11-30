import { Size } from "@/types/products-related-types";
import qs from "query-string";
import { getUrl } from "../get-url";

const getSizes = async (): Promise<Size[]> => {
  const URL = await getUrl().then((data) => {
    if (data.data) {
      return `${data.data.baseUrl}/${data.data.storeId}/categories`;
    }
  });

  if (!URL) {
    throw new Error("URL is undefined");
  }

  const res = await fetch(URL!);

  return res.json();
};

export default getSizes;
