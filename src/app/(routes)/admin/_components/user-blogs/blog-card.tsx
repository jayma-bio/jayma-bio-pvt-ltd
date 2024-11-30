import { Block } from "@blocknote/core";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ViewEditor from "@/components/editor/view-editor";
import { Label } from "@/components/ui/label";

const BlogSchema = z.object({
  thumbnail: z.string().min(1, "Thumbnail is required"),
  title: z.string().min(1, "Title is required"),
  likes: z.number(),
});

type BlogFormValues = {
  id?: string;
  thumbnail: string;
  title: string;
  likes: number;
  content: Block[];
};

interface BlogCardProps {
  initialData?: BlogFormValues;
}

const BlogCard: React.FC<BlogCardProps> = ({ initialData }) => {
  const [blocks, setBlocks] = useState<Block[]>(
    simplifyBlockFormat(initialData?.content)
  );

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: initialData || {
      thumbnail: "",
      title: "",
      likes: 0,
    },
  });

  function simplifyBlockFormat(blocks: any): any[] {
    // Check if blocks is undefined or null
    if (!blocks) {
      return [];
    }

    // If blocks is not an array, wrap it in an array
    const blocksArray = JSON.parse(blocks);

    try {
      return blocksArray.map((block: any) => {
        // Get the content text if it exists
        const content =
          block.content && block.content[0]?.text ? block.content[0].text : "";

        return {
          type: block.type,
          content: content,
        };
      });
    } catch (error) {
      console.error("Error in simplifyBlockFormat:", error);
      return [];
    }
  }

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setBlocks(simplifyBlockFormat(initialData.content));
    }
  }, [initialData, form]);

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Label className="font-semibold">Thumbnail</Label>
        <img
          src={initialData?.thumbnail!}
          alt="Thumbnail"
          className="h-40 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-semibold">Title</Label>
        <h1 className="text-xl">{form.getValues("title")}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-semibold">Content</Label>
        <ViewEditor initialContent={blocks} />
      </div>
    </div>
  );
};

export default BlogCard;
