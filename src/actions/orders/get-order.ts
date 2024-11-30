import { Orders } from "@/types/products-related-types";
import { getUrl } from "../get-url";

const getOrder = async (id: string): Promise<Orders> => {
  const URL = await getUrl().then((data) => {
    if (data.data) {
      return `${data.data.baseUrl}/${data.data.storeId}/orders`;
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
      name: data.name || "",
      email: data.email || "",
      isPaid: Boolean(data.isPaid),
      phone: data.phone || "",
      orderItems: Array.isArray(data.orderItems) ? data.orderItems : [],
      address: data.address || "",
      order_status: data.order_status || "",
      amount: Number(data.amount) || 0,
      sent_email: Boolean(data.sent_email),
      paymentId: data.paymentId || "",
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export default getOrder;
