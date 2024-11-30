"use client";

import { getUrl } from "@/actions/get-url";
import Loader from "@/components/shared/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id");

  const router = useRouter();

  useEffect(() => {
    if (!orderId) {
      router.push("/checkout-cancelled");
      return;
    }
  }, [orderId]);

  const handleWebhook = async () => {
    const URL = await getUrl().then((data) => {
      if (data.data) {
        return `${data.data.baseUrl}/${data.data.storeId}`;
      }
    });

    const response = await axios.post(`${URL}/status`, {
      orderId: orderId,
    });
    if (response.data === null) {
      router.push("/checkout-failed");
    }

    if (response.data.status === 200) {
      console.log(response.data.data);

      if (response.data.data.payment_status === "SUCCESS") {
        router.push(
          "/checkout-success?order_id=" +
            orderId +
            "&payment_id=" +
            response.data.data.cf_payment_id +
            "&status=" +
            response.data.data.payment_status.toLowerCase()
        );
      } else if (response.data.data.cf_payment_id === null || "") {
        router.push("/checkout-cancelled");
      } else if (response.data.data.payment_status === "FAILED" || "FAILURE") {
        router.push("/checkout-failed");
      } else {
        router.push("/checkout-cancelled");
      }
      localStorage.removeItem("url");
    }
  };

  useEffect(() => {
    handleWebhook();
  }, []);

  return <Loader />;
};

export default Page;
