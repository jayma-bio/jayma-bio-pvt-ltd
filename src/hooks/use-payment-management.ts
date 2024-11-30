import { useCallback, useEffect, useState } from "react";
import { getManagement } from "@/actions/payment-management/get-management";

interface PaymentCalculation {
  shipping: number;
  tax: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePaymentManagement = (): PaymentCalculation => {
  const [shipping, setShipping] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndFormatData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getManagement();

      if (response.success && response.data && response.data.length > 0) {
        // Get the latest payment management record
        const latestManagement = response.data[0];

        // Convert string values to numbers and handle potential invalid inputs
        const shippingValue = parseFloat(
          latestManagement.shipping.replace(/[^\d.]/g, "")
        );
        const taxValue = parseFloat(
          latestManagement.tax.replace(/[^\d.]/g, "")
        );

        setShipping(isNaN(shippingValue) ? 0 : shippingValue);
        setTax(isNaN(taxValue) ? 0 : taxValue);
      } else {
        setError("No payment management data found");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch payment data"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAndFormatData();
  }, [fetchAndFormatData]);

  return {
    shipping,
    tax,
    isLoading,
    error,
    refetch: fetchAndFormatData,
  };
};
