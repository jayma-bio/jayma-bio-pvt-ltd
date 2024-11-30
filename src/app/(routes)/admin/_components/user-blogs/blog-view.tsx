"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/shared/loader";
import BlogCard from "./blog-card";
import { getBlogById } from "@/actions/blogs/get-blogs";

interface ViewBlogProps {
  blogId: string;
  initialBlog?: {
    id: string;
    thumbnail: string;
    title: string;
    content: any;
    likes: number;
  } | null;
}

const ViewBlog = ({ blogId, initialBlog }: ViewBlogProps) => {
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(!initialBlog);

  useEffect(() => {
    if (!initialBlog) {
      const fetchBlog = async () => {
        try {
          const data = await getBlogById(blogId);
          if (data.success) {
            setBlog(data.data);
          } else {
            toast.error("Failed to fetch blog");
          }
        } catch (error) {
          toast.error("Error fetching blog");
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [blogId, initialBlog]);

  console.log("blog", blog);

  if (loading) {
    return <Loader />;
  }

  return <>{blog && <BlogCard initialData={blog} />}</>;
};

export default ViewBlog;
