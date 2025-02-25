"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import BlogCard from "../../../_components/blogs/blog-card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getBlogById } from "@/actions/blogs/get-blogs";
import { updateBlog } from "@/actions/blogs/update-blog";
import Loader from "@/components/shared/loader";

interface EditBlogFormProps {
  blogId: string;
  initialBlog?: {
    id: string;
    thumbnail: string;
    title: string;
    content: any;
    likes: number;
  } | null;
}

const EditBlogForm = ({ blogId, initialBlog }: EditBlogFormProps) => {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(!initialBlog);

  useEffect(() => {
    if (!initialBlog) {
      const fetchBlog = async () => {
        try {
          await getBlogById(blogId).then((data) => {
            if (data.success) {
              setBlog(data.data);
            } else {
              toast.error("Failed to fetch blog");
            }
          });
        } catch (error) {
          toast.error("Error fetching blog");
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [blogId, initialBlog]);

  const handleSubmit = async (data: any) => {
    await updateBlog(data).then((data) => {
      if (data.success) {
        router.push("/profile/blogs");
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/profile/blogs">Blogs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {blog && (
        <BlogCard mode="update" initialData={blog} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default EditBlogForm;
