"use client";

import React from "react";
import BlogCard from "./blog-card";
import { useBlogs } from "@/hooks/blogs/get-blogs";
import Loader from "@/components/shared/loader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BlogComponent = () => {
  const { blogs, loading } = useBlogs();

  const nonArchivedBlogs = blogs.filter(blog => !blog.archived);
  const isNoBlogs = nonArchivedBlogs.length === 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="mt-8 md:mt-12 py-4 md:py-8 max-w-screen-2xl mx-auto px-5 md:px-10 lg:px-14 flex flex-col gap-6">
      <h1 className="text-center text-6xl font-bold text-green">Blogs</h1>
      {isNoBlogs ? (
        <div className="w-full h-full flex items-center justify-center mt-8 md:mt-10">
          <div className="w-full flex flex-col gap-5 md:gap-10 pt-4 md:pt-0">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
              <img
                src="/landing/blog.svg"
                alt="cart"
                className="w-[70%] md:w-[40%] select-none md:-mt-4 ml-8"
              />
            </div>
            <div className="w-fill flex items-center justify-center mt-7">
              <Link href="/profile/blogs/new">
                <Button className="w-[200px] md:w-[250px] flex items-center gap-2 rounded-2xl">
                  <ChevronLeft className="size-6 shrink-0 text-white" />
                  Post a Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 mt-4 md:mt-8">
          {nonArchivedBlogs.map(
            (
              {
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
              },
              index
            ) => (
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
      )}
    </section>
  );
};

export default BlogComponent;

