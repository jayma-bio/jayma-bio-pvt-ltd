"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  Mail,
  Archive,
  Clock10,
  Check,
} from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { getBlogs } from "@/actions/blogs/get-blogs";
import { deleteBlog } from "@/actions/blogs/delete-blog";
import { useUserData } from "@/hooks/user-data";

interface Blog {
  id: string;
  thumbnail: string;
  title: string;
  content: any;
  likes: number;
  toggle?: boolean;
  archived?: boolean;
  role?: string;
  userName?: string;
}

const BlogComponent = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { user } = useUserData();
  const [loading, setLoading] = useState(true);
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Blog",
    "Are you sure you want to delete this blog? This action cannot be undone."
  );

  const fetchBlogs = async () => {
    try {
      await getBlogs().then((data) => {
        if (data.success) {
          if (data.data) {
            setBlogs(data.data);
          } else {
            setBlogs([]);
          }
        } else {
          toast.error("Failed to fetch blogs");
        }
      });
    } catch (error) {
      toast.error("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (await confirm()) {
      try {
        await deleteBlog(id).then((data) => {
          if (data.success) {
            toast.success("Blog deleted successfully");
            fetchBlogs();
          } else {
            toast.error("Failed to delete blog");
          }
        });
      } catch (error) {
        toast.error("Error deleting blog");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlog = blogs.filter(
    (blog) => blog.role === user?.role && blog.userName === user?.name
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <Link href="/profile/blogs/new">
            <Button className="bg-green hover:bg-green/90 flex items-center gap-2">
              Add Blog
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-center">Likes</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlog.map(
                (blog) =>
                  blog.role === "USER" && (
                    <TableRow key={blog.id}>
                      <TableCell>
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {blog.title}
                      </TableCell>
                      <TableCell className="text-center">
                        {blog.likes}
                      </TableCell>
                      <TableCell className="mx-auto text-center">
                        {blog.archived ? (
                          <div className="flex justify-center items-center gap-2">
                            <Clock10 className="text-yellow-500" />
                            Waiting for approval
                          </div>
                        ) : (
                          <div className="flex justify-center items-center gap-2">
                            <Check className="text-green" />
                            Approved
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/profile/blogs/edit/${blog.id}`}>
                            <Button variant="outline" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <ConfirmDialog />
    </>
  );
};

export default BlogComponent;
