"use server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { connect } from "http2";

type BlogFormValues = {
  thumbnail: string;
  title: string;
  likes: number;
  content: string;
  name: string;
  userName: string;
  userImage: string;
  userId: string;
  role: UserRole;
};

export default async function addBlogs(data: BlogFormValues) {
  try {
    const userExists = await prismadb.user.findUnique({
      where: { id: data.userId },
    });

    if (!userExists) {
      throw new Error("User does not exist");
    }

    const { userId, ...createValue } = {
      ...data,
      archived: data.role === "ADMIN" ? false : true,
    };

    await prismadb.blog.create({
      data: {
        ...createValue,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
