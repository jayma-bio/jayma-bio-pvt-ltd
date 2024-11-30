import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Block } from "@blocknote/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";
import * as z from "zod";
import dynamic from "next/dynamic";
import { useUserData } from "@/hooks/user-data";
import { UploadDropzone } from "@/lib/uplaodthing";

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
  content: string;
};

interface BlogCardProps {
  initialData?: BlogFormValues;
  mode?: "add" | "update";
  onSubmit?: (data: BlogFormValues) => Promise<void>;
}

const BlogCard: React.FC<BlogCardProps> = ({
  initialData,
  mode = "add",
  onSubmit,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialData?.thumbnail || null
  );
  const [description, setDescription] = useState<Block[]>([]);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const AddEditor = useMemo(
    () =>
      dynamic(() => import("@/components/editor/add-editor"), { ssr: false }),
    []
  );
  const UpdateEditor = useMemo(
    () =>
      dynamic(() => import("@/components/editor/update-editor"), {
        ssr: false,
      }),
    []
  );

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: initialData || {
      thumbnail: "",
      title: "",
      likes: 0,
    },
  });

  const user = useUserData();

  useEffect(() => {
    if (initialData?.content) {
      try {
        const parsedContent = JSON.parse(initialData.content);
        setBlocks(parsedContent);
      } catch (error) {
        console.error("Error parsing initial content:", error);
        setBlocks([]);
      }
    }
  }, [initialData]);

  const handleImageUpload = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[]
  ) => {
    if (res && res.length > 0) {
      setUploadedImage(res[0].url);
      form.setValue("thumbnail", res[0].url);
      toast.success("Image uploaded successfully");
    }
  };
  
  const handleImageDelete = () => {
    setUploadedImage(null);
    form.setValue("thumbnail", "");
    toast.success("Image removed");
  };

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      setLoading(true);

      const updatedData =
        mode === "update"
          ? {
              ...data,
              id: initialData?.id,
              content: JSON.stringify(blocks),
            }
          : {
              ...data,
              id: initialData?.id,
              role: user?.user?.role,
              name: user?.user?.name,
              userName: user?.user?.username,
              userImage: user?.user?.image,
              content: JSON.stringify(blocks),
            };

      if (onSubmit) {
        await onSubmit(updatedData);
      }

      toast.success(
        mode === "add"
          ? "Blog created successfully!"
          : "Blog updated successfully!"
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="flex justify-end items-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "add" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "add" ? "Create Blog" : "Update Blog"}</>
              )}
            </Button>
          </div>
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-4">
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={handleImageUpload}
                      onUploadError={(error: Error) => {
                        toast.error("Image upload failed");
                      }}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {uploadedImage && (
                        <div className="relative group aspect-auto">
                          <div
                            className="cursor-pointer rounded-lg overflow-hidden h-full"
                            onClick={() => {
                              setSelectedImage(uploadedImage);
                              setShowImageDialog(true);
                            }}
                          >
                            <img
                              src={uploadedImage}
                              alt={`Event image ${uploadedImage + 1}`}
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleImageDelete}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter blog title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {mode === "add" ? (
                    <AddEditor setBlocks={setBlocks} />
                  ) : (
                    <UpdateEditor
                      setBlocks={setBlocks}
                      initialContent={JSON.stringify(blocks)}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default BlogCard;
