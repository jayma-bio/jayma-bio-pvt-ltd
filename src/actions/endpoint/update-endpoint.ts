"use server";

import prismadb from "@/lib/prismadb";

interface EndpointType {
  id?: string;
  baseUrl: string;
  storeId: string;
}

export async function updateEndpoint(data: EndpointType) {
  const { id, ...body } = data;
  try {
    const endpoints = await prismadb.ecommerceEndpoint.update({
      where: { id: id },
      data: body,
    });
    return { message: "Updated", data: endpoints, success: true };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Couldn't update", success: false };
  }
}
