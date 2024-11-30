"use server";

import prismadb from "@/lib/prismadb";
import { Block } from "@blocknote/core";
import { sendEventMail } from "../event-newsletter";

type BlogFormValues = {
  id: string;
  thumbnail?: string;
  title?: string;
  content?: string;
  toggle?: boolean;
  archived?: boolean;
  likes? : number;
  likedId?: string[];
};

export async function updateBlog(data: BlogFormValues) {
  try {
    const blog = await prismadb.blog.update({
      where: {
        id: data.id,
      },
      data: {
        thumbnail: data.thumbnail,
        title: data.title,
        content: data.content,
        toggle: data.toggle,
        archived: data.archived,
        likes: data.likes,
        likedId: data.likedId,
      },
    });

    if (data.toggle && !data.archived) {
      const res = await sendEventMail(
        blog.title,
        JSON.parse(blog.content)[0]?.content?.[0]?.text || "",
        new Date(blog.updatedAt).toDateString(),
        blog.id,
      );
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
