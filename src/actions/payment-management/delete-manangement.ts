"use server";

import prismadb from "@/lib/prismadb";

interface ManagementProps {
  id: string;
}

interface ManagementReturnProps {
  message: string;
  success: boolean;
  error?: any;
}

export async function deleteManagement(
  data: ManagementProps
): Promise<ManagementReturnProps> {
  try {
    await prismadb.paymentManagement.delete({
      where: { id: data.id },
    });

    return {
      message: "Management deleted successfully",
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
