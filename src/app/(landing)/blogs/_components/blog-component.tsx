"use client";

import React from "react";
import BlogCard from "./blog-card";
import { useBlogs } from "@/hooks/blogs/get-blogs";
import Loader from "@/components/shared/loader";

const BlogComponent = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="mt-8 md:mt-12 py-4 md:py-8 max-w-screen-2xl mx-auto px-5 md:px-10 lg:px-14 flex flex-col gap-6">
      <h1 className="text-center text-6xl font-bold text-green">Blogs</h1>
      <div className="flex flex-col gap-8 mt-4 md:mt-8">
        {blogs.map(
          ({
            thumbnail,
            title,
            likes,
            content,
            id,
            createdAt,
            name,
            userName,
            userImage,
            likedId,
            archived,
          }, index) =>
            !archived && (
              <BlogCard
                key={id}
                id={id}
                thumbnail={thumbnail}
                title={title}
                likes={likes}
                content={JSON.parse(content)[0]?.content[0]?.text}
                link={`/blogs/${id}`}
                date={createdAt.toISOString()}
                name={name}
                userName={userName}
                userImage={userImage}
                likedId={likedId}
                reverse={index % 2 === 0}
              />
            )
        )}
      </div>
    </section>
  );
};

export default BlogComponent;
