"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AddRefundTypes {
  title: string;
  link: string;
}

interface ResponseTypes {
  message: string;
  status: number;
  error?: any;
}

export async function addRefund(
  data: AddRefundTypes
): Promise<ResponseTypes> {
  try {
    await prisma.refund.create({
      data: data,
    });

    return { message: "Refund added successfully", status: 200 };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error adding refund", status: 500 };
  }
}
