"use server";

import prismadb from "../lib/prismadb";



export async function getUrl() {
  try {
    const endpoints = await prismadb.ecommerceEndpoint.findMany({
      select: {
        baseUrl: true,
        storeId: true,
      },
    });
    return { data: endpoints[0], success: true };
  } catch (error) {
    console.log(error);
    return { error: error, success: false };
  }
}
