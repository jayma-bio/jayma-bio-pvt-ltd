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
import BlogCard from "../blog-card";
import { useRouter } from "next/navigation";
import addBlogs from "@/actions/blogs/add-blogs";
import { toast } from "sonner";

const AddBlogForm = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await addBlogs(data).then((res) => {
      if (res.success) {
        toast.success("Blog added successfully");
        router.push("/profile/blogs");
      } else {
        toast.error("Failed to add blog");
      }
    });
  };

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
            <BreadcrumbPage>Add Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <BlogCard mode="add" onSubmit={handleSubmit} />
    </>
  );
};

export default AddBlogForm;
