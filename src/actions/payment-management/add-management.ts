"use server";

import prismadb from "@/lib/prismadb";

interface ManagementProps {
  shipping: string;
  tax: string;
}

interface ManagementReturnProps {
  message: string;
  success: boolean;
  error?: any;
}

export async function addManagement(
  data: ManagementProps
): Promise<ManagementReturnProps> {
  try {
    await prismadb.paymentManagement.create({
      data: data,
    });

    return {
      message: "Management added successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred",
      success: false,
      error: error,
    };
  }
}
