"use server";

import prismadb from "@/lib/prismadb";

interface UpdateCareerTypes {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface ResponseTypes {
  message: string;
  status: number;
  error?: any;
}

export async function updateCareer(
  data: UpdateCareerTypes
): Promise<ResponseTypes> {
  try {
    await prismadb.careers.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
      },
    });

    return { message: "Career updated successfully", status: 200 };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error updating career", status: 500 };
  }
}
