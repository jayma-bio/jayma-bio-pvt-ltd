"use server";

import prismadb from "@/lib/prismadb";

interface AddCareerTypes {
  title: string;
  description: string;
  link: string;
}

interface ResponseTypes {
  message: string;
  status: number;
  error?: any;
}

export async function addCareers(
  data: AddCareerTypes
): Promise<ResponseTypes> {
  try {
    await prismadb.careers.create({
      data: data,
    });

    return { message: "Career added successfully", status: 200 };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error adding career", status: 500 };
  }
}
