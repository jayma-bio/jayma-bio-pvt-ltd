"use server";

import prismadb from "@/lib/prismadb";
import { Block } from "@blocknote/core";
import { UserRole } from "@prisma/client";

type BlogFormValues = {
  thumbnail: string;
  title: string;
  likes: number;
  content: string;
  name: string;
  userName: string;
  userImage: string;
  role: UserRole;
};

export default async function addBlogs(data: BlogFormValues) {
  try {
    await prismadb.blog.create({
      data: data,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
