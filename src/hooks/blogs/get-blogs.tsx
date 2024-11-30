"use client";

import { getBlogs } from "@/actions/blogs/get-blogs";
import { UserRole } from "@prisma/client";
import { useState, useEffect } from "react";

interface Blog {
  id: string;
  thumbnail: string;
  title: string;
  content: string;
  likes: number;
  toggle: boolean;
  archived: boolean;
  name: string;
  userName: string;
  userImage: string;
  role: UserRole;
  likedId: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        
        if (response.data) {
          setBlogs(response.data);
        } else {
          setBlogs([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}
