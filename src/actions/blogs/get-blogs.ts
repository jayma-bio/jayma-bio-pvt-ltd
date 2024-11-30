"use server";

import prismadb from "@/lib/prismadb";

export async function getBlogs() {
  try {
    const blogs = await prismadb.blog.findMany();

    return { data: blogs, success: true };
  } catch (error) {
    console.error(error);
    return { data: null, success: false };
  }
}

export async function getBlogById(id: string) {
  try {
    const blogs = await prismadb.blog.findUnique({
      where: {
        id: id,
      },
    });

    return { data: blogs, success: true };
  } catch (error) {
    console.error(error);
    return { data: null, success: false };
  }
}
