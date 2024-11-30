import ViewEditor from "@/components/editor/view-editor";
import { formatDate } from "@/lib/utils";
import { Blog } from "@prisma/client";
import React from "react";

interface BlogComponentType {
  blog: Blog;
}

const BlogComponent = ({ blog }: BlogComponentType) => {
  return (
    <div className="flex flex-col gap-10 py-10 px-20">
      <img src={blog.thumbnail} alt={blog.title} className="object-cover" />
      <h1 className="text-4xl font-bold mt-4">{blog.title}</h1>
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4">
          <img
            src={blog.userImage}
            alt={blog.userName}
            className="w-11 h-11 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-sm">{blog.name}</p>
            <p className="text-sm">@{blog.userName}</p>
          </div>
        </div>
        <p className="text-sm">
          published on {formatDate(blog.createdAt.toISOString(), 2)}
        </p>
      </div>
      <ViewEditor initialContent={JSON.parse(blog.content)} />
    </div>
  );
};

export default BlogComponent;
