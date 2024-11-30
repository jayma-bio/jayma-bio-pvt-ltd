"use server";

import prismadb from "@/lib/prismadb";

interface ManagementProps {
  id: string;
  shipping?: string;
  tax?: string;
}

interface ManagementReturnProps {
  message: string;
  success: boolean;
  error?: any;
}

export async function updateManagement(
  data: ManagementProps
): Promise<ManagementReturnProps> {
  try {
    const { id, ...body } = data;
    await prismadb.paymentManagement.update({
      where: { id: id },
      data: body,
    });
    
    return {
      message: "Management updated successfully",
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
