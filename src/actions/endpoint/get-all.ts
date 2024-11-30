"use server";

import prismadb from "@/lib/prismadb";

export async function getAll() {
  try {
    const endpoints = await prismadb.ecommerceEndpoint.findMany();
    return { data: endpoints, success: true };
  } catch (error) {
    console.log(error);
    return { error: error, success: false };
  }
}
