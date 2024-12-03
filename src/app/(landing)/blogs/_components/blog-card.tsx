import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { updateBlog } from "@/actions/blogs/update-blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useUserData } from "@/hooks/user-data";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  id: string;
  thumbnail: string;
  title: string;
  likes: number;
  content: string;
  link: string;
  date: string;
  name: string;
  userName: string | null;
  userImage: string;
  likedId: string[];
  className?: string;
  reverse?: boolean;
}

const BlogCard = ({
  id,
  thumbnail,
  title,
  likes,
  content,
  link,
  date,
  name,
  userName,
  userImage,
  likedId,
  className,
  reverse,
}: BlogCardProps) => {
  const { user } = useUserData();
  const [like, setLike] = useState(likedId?.includes(user?.id!));
  const [likeCount, setLikeCount] = useState(likes);
  const router = useRouter();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Jayma Bio Innovations",
          text: "Check out this blog!",
          url: `${process.env.NEXT_PUBLIC_APP_URL!}${link}`,
        });
      } catch (error) {
        toast("Error sharing the link");
      }
    } else {
      window.navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL!}${link}`
      );
      toast("Link copied to clipboard");
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.info("Please login to like the blog");
      router.push("/login");
      return;
    }
    setLike(!like);
    try {
      const data = await updateBlog({
        id: id,
        likes: like ? likeCount - 1 : likeCount + 1,
        likedId: like
          ? likedId.filter((likeId) => likeId !== user?.id)
          : [...likedId, user?.id!],
      });

      if (data.success) {
        setLikeCount(like ? likeCount - 1 : likeCount + 1);
        toast(like ? "Blog disliked successfully" : "Blog liked successfully");
      } else {
        toast("Error updating the blog");
      }
    } catch (error) {
      toast("Error updating the blog");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row-reverse border shadow-md rounded-lg my-3",
        reverse && "md:flex-row",
        className
      )}
    >
      <div
        className={cn(
          "w-full md:w-3/7 h-full object-contain aspect-[4/2] md:aspect-[4/2.5] overflow-hidden rounded-tl-lg",
          reverse
            ? "md:rounded-tl-lg md:rounded-bl-lg"
            : "md:rounded-tr-lg md:rounded-br-lg md:rounded-tl-none md:rounded-bl-none"
        )}
      >
        <img
          src={thumbnail}
          alt={title}
          className={cn("object-cover w-full h-full")}
        />
      </div>
      <div className="flex flex-col justify-between px-5 md:px-10 py-5 w-full md:w-4/7">
        <div className="space-y-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <Avatar className="lg:h-12 lg:w-12 h-12 w-12">
                <AvatarImage
                  src={userImage}
                  alt={`${userName}'s profile image`}
                />
                <AvatarFallback className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white">
                  <FaUser className="lg:w-5 lg:h-5 h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <p className="font-extralight text-sm">{name}</p>
              {userName && (
                <p className="font-extralight text-sm">@{userName}</p>
              )}
              <p className="font-extralight text-sm">{formatDate(date, 1)}</p>
            </div>
            <button onClick={handleShare} className="border-none">
              <Share2 size={24} />
            </button>
          </div>
          <div className="space-y-3 w-full min-h-[20vh] md:min-h-0 py-3 md:py-0">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="font-extralight text-sm">{content}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center">
              <button onClick={handleLike} className="border-none">
                <img
                  src={
                    !like
                      ? "/landing/blogs/heart.png"
                      : "/landing/blogs/filled-heart.png"
                  }
                  alt="likes"
                  className="w-6 h-6 mr-2"
                />
              </button>
              <p className="text-xl">{likeCount}</p>
            </div>
          </div>
          <Link href={link}>
            <Button className="bg-green">Read Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
