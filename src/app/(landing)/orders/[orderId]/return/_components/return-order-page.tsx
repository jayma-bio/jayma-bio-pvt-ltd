"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category, Orders } from "@/types/products-related-types";
import { ChevronLeft, Info, Loader2, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";
import { UploadButton } from "@/lib/uplaodthing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getUrl } from "@/actions/get-url";
import { useRouter } from "next/navigation";
import axios from "axios";

interface OrderReturnPageProps {
  order: Orders;
  categories: Category[];
}

const formSchema = z.object({
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  itemName: z.string().min(1, {
    message: "Please select the product you want to cancel",
  }),
  images: z.array(z.string()).optional(),
  reason: z.string().min(1, {
    message: "Please select the reason for cancelling the order",
  }),
  return_or_refund: z.enum(["return", "refund"]),
});

const REASON_LIST = [
  "Found a better price elsewhere",
  "Product didn't match description",
  "Defective Product/Item received",
  "Ordered the wrong item by mistake",
  "Received wrong Item/Product",
  "Issue with payment or checkout process",
] as const;

const ReturnOrderPage = ({ order, categories }: OrderReturnPageProps) => {
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    order.returnImages?.map((image) => image.url) || []
  );
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: categories[0]?.name || "",
      itemName: "",
      reason: "",
      images: uploadedImages,
    },
  });

  const watchedCategory = form.watch("category");
  const watchedReason = form.watch("reason");
  const isDefectiveOrWrongItem =
    watchedReason === "Defective Product/Item received" ||
    watchedReason === "Received wrong Item/Product";
  const isSapStudioCategory = watchedCategory === "SapSymphony";

  const filteredOrderItems = order.orderItems.filter(
    (item) => item.category === watchedCategory
  );

  const handleImageUpload = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[]
  ) => {
    if (res?.length > 0) {
      const fileUrls = res.map((file) => file.url);
      const updatedImages = [...uploadedImages, ...fileUrls];
      setUploadedImages(updatedImages);
      form.setValue("images", updatedImages);
      toast.success("Image uploaded successfully");
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = uploadedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedImages(updatedImages);
    form.setValue("images", updatedImages);
    toast.success("Image removed");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const URL = await getUrl().then((data) => {
        if (data.data) {
          return `${data.data.baseUrl}/${data.data.storeId}`;
        }
      });

      const returned_items = order.orderItems.filter(
        (item) => item.name === values.itemName
      );

      const data =
        values.itemName.length === order.orderItems.map((item) => item.name).length
          ? {
            return_reason: values.reason,
            return_or_refund: values.return_or_refund,
            returnImages: values.images,
            returned_items: returned_items,
            returnWholeOrder: true,
          } : {
            return_reason: values.reason,
            return_or_refund: values.return_or_refund,
            returnImages: values.images,
            returned_items: returned_items,
          };

      const response = await axios.post(
        `${URL}/orders/${order.id}/return`,
        data
      );

      if (response.status === 200) {
        toast.success("Return order placed successfully");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place return order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen h-full flex flex-col max-w-screen-2xl mx-auto gap-3 md:gap-5 px-5 md:px-10 lg:px-14 mt-5 md:mt-8 py-4 md:py-6">
      <div className="w-full flex flex-col gap-2 md:gap-4">
        <div className="w-full flex items-center justify-start mt-2 md:mt-4">
          <Link href={`/orders/${order?.id}`}>
            <Button
              className="flex items-center gap-2 text-green"
              variant="outline"
            >
              <ChevronLeft className="size-5 shrink-0 text-green" />
              Back
            </Button>
          </Link>
        </div>

        <div className="w-full flex items-center justify-start mt-2 md:mt-5">
          <h1 className="text-xl md:text-4xl font-medium">
            Return Order Request
          </h1>
        </div>

        <Separator className="w-full h-[1px] bg-separator" />

        <div className="w-full h-full flex flex-col md:flex-row gap-3 mt-6 min-h-[70vh]">
          <div className="w-full md:w-1/2 flex flex-col gap-3 items-start justify-normal">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Select The Category Of The Product You Want To Return
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 border-green/60">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.name}
                              value={category.name}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isSapStudioCategory && (
                  <>
                    <FormField
                      control={form.control}
                      name="itemName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Select The Product You Want To Return
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 border-green/60">
                                <SelectValue placeholder="Select Product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {filteredOrderItems.length > 0 ? (
                                filteredOrderItems.map((item) => (
                                  <SelectItem key={item.id} value={item.name}>
                                    {item.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-items" disabled>
                                  No items found in this category
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="return_or_refund"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Would you like to return or refund?
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 border-green/60">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="return">Return</SelectItem>
                              <SelectItem value="refund">Refund</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Select The Reason For Return The Order
                          </FormLabel>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 border-green/60">
                                <SelectValue placeholder="Select Reason" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {REASON_LIST.map((reason) => (
                                <SelectItem key={reason} value={reason}>
                                  {reason}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {isDefectiveOrWrongItem && (
                      <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">
                              Upload Images
                            </FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                <UploadButton
                                  endpoint="imageUploader"
                                  onClientUploadComplete={handleImageUpload}
                                  onUploadError={(error: Error) => {
                                    toast.error("Image upload failed");
                                  }}
                                  className="w-full h-[60px]"
                                />
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                  {uploadedImages.map((imageUrl, index) => (
                                    <div
                                      key={index}
                                      className="relative group aspect-square"
                                    >
                                      <div
                                        className="cursor-pointer rounded-lg overflow-hidden h-full border border-green/60"
                                        onClick={() => {
                                          setSelectedImage(imageUrl);
                                          setShowImageDialog(true);
                                        }}
                                      >
                                        <Image
                                          src={imageUrl}
                                          alt={`Event image ${index + 1}`}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeImage(index)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </>
                )}

                {!isSapStudioCategory && (
                  <Alert>
                    <Info className="size-5 shrink-0 text-green -mt-1" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                      The product you are selecting is NOT returnable. Please
                      read our{" "}
                      <Link
                        href="/cancellation-refund"
                        className="text-green underline font-semibold"
                      >
                        Cancellation & Refund Policy
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="h-12 w-[170px] text-white mt-5"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Proceed"}
                  {loading && (
                    <Loader2 className="size-5 shrink-0 text-white animate-spin" />
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="w-full md:w-1/2 items-center justify-center hidden md:flex">
            <Image
              src="/checkout/cancelled.svg"
              alt="cart"
              width={288}
              height={288}
              className="w-44 md:w-72 select-none mt-5 md:mt-8"
            />
          </div>
        </div>
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full aspect-video">
              <Image
                src={selectedImage}
                alt="Event image preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ReturnOrderPage;
