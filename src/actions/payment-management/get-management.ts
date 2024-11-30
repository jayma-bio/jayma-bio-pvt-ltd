"use server";

import prismadb from "@/lib/prismadb";
import { PaymentManagement } from "@prisma/client";

export interface ManagementReturnProps {
  message: string;
  data?: PaymentManagement[];
  success: boolean;
  error?: any;
}

export async function getManagement(): Promise<ManagementReturnProps> {
  try {
    const data = await prismadb.paymentManagement.findMany();

    return {
      message: "Management added successfully",
      data: data,
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
