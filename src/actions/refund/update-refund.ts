"use server";

import prismadb from "@/lib/prismadb";

interface UpdateRefundTypes {
  id: string;
  title: string;
  link: string;
}

interface ResponseTypes {
  message: string;
  status: number;
  error?: any;
}

export async function updateRefund(
  data: UpdateRefundTypes
): Promise<ResponseTypes> {
  try {
    await prismadb.refund.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        link: data.link,
      },
    });

    return { message: "Refund updated successfully", status: 200 };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error updating refund", status: 500 };
  }
}
