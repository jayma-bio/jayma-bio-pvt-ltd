"use server";

import prismadb from "@/lib/prismadb";
import { Careers } from "@prisma/client";

interface GetCareerByIdTypes {
  id: string;
}

interface ResponseTypes {
  message: string;
  status: number;
  error?: any;
  careers?: Careers[];
  career?: Careers;
}

export async function getCareers() {
  try {
    const careers = await prismadb.careers.findMany();

    return {
      message: "Careers found successfully",
      status: 200,
      careers: careers,
    };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error finding careers", status: 500 };
  }
}

export async function getCareerById(
  data: GetCareerByIdTypes
): Promise<ResponseTypes> {
  try {
    const career = await prismadb.careers.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!career) {
      return { message: "Career not found", status: 404 };
    }

    return {
      message: "Career found successfully",
      status: 200,
      career: career,
    };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error finding career", status: 500 };
  }
}
