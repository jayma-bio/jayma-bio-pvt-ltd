"use server";

import prismadb from "@/lib/prismadb";

export async function deleteEndpoint(id: string) {
  try {
    const endpoints = await prismadb.ecommerceEndpoint.delete({
      where: {
        id: id,
      },
    });
    return { message: "Deleted", success: true };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Couldn't delete", success: false };
  }
}
