"use server";

import { PrismaClient, Refund } from '@prisma/client';

const prisma = new PrismaClient();

interface GetRefundByIdTypes {
  id: string;
}

interface ResponseTypes {
  message: string;
  status: number;
  error?: any;
  refund?: Refund;
}

export async function getRefunds(): Promise<ResponseTypes> {
  try {
    const refunds = await prisma.refund.findMany();

    return {
      message: "Refunds found successfully",
      status: 200,
      refund: refunds[0],
    };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error finding refunds", status: 500 };
  }
}

export async function getRefundById(
  data: GetRefundByIdTypes
): Promise<ResponseTypes> {
  try {
    const refund = await prisma.refund.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!refund) {
      return { message: "Refund not found", status: 404 };
    }

    return {
      message: "Refund found successfully",
      status: 200,
      refund: refund,
    };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error finding refund", status: 500 };
  }
}
