"use server";

import prismadb from "@/lib/prismadb";

interface EndpointType {
  baseUrl: string;
  storeId: string;
}

export async function addEndpoint(data: EndpointType) {
  try {
    const endpoints = await prismadb.ecommerceEndpoint.create({
      data: data,
    });
    return { message: "Created", data: endpoints, success: true };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Couldn't create", success: false };
  }
}
