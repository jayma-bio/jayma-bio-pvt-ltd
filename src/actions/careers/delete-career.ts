"use server";

import prismadb from "@/lib/prismadb";

interface DeleteCareerTypes {
  id: string;
}

interface ResponseTypes {
  message: string;
  status: number;
  error?: any;
}

export async function deleteCareer(
  data: DeleteCareerTypes
): Promise<ResponseTypes> {
  try {
    await prismadb.careers.delete({
      where: {
        id: data.id,
      },
    });

    return { message: "Career deleted successfully", status: 200 };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Error deleting career", status: 500 };
  }
}
