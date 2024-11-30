"use server";

import prismadb from "@/lib/prismadb";
import { SupporterSchema } from "@/schemas";
import { z } from "zod";

interface ReturnType {
  success: boolean;
}

export const getSupporters = async () => {
  const supporters = await prismadb.collabs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return supporters;
};

export const addSupporter = async (
  values: z.infer<typeof SupporterSchema>
): Promise<ReturnType> => {
  try {
    const res = await prismadb.collabs.create({
      data: values,
    });
    if (res) {
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    return { success: false };
  }
};

export const updateSupporter = async (
  id: string,
  values: z.infer<typeof SupporterSchema>
): Promise<ReturnType> => {
  try {
    const res = await prismadb.collabs.update({
      where: {
        id,
      },
      data: values,
    });
    if (res) {
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    return { success: false };
  }
};

export const deleteSupporter = async (id: string): Promise<ReturnType> => {
  try {
    const res = await prismadb.collabs.delete({
      where: {
        id,
      },
    });
    if (res) {
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    return { success: false };
  }
};
