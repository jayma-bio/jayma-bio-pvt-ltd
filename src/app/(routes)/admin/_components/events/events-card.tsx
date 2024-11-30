import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadDropzone } from "@/lib/uplaodthing";
import { toast } from "sonner";
import Image from "next/image";
import { ClientUploadedFileData } from "uploadthing/types";
import { sendEventMail } from "@/actions/event-newsletter";
import { MultiSelect } from "@/components/ui/muti-select";
import { EventType } from "@prisma/client";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { TimePicker12Demo } from "@/components/date-time-picker.tsx/time-picker-demo";
import { options } from "./event-tags";
import AddEditor from "@/components/editor/add-editor";
import UpdateEditor from "@/components/editor/update-editor";
import { Block } from "@blocknote/core";
import { Label } from "@/components/ui/label";

// Event type definition
type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: Date;
  link: string;
  image?: string[];
  eventType: EventType;
  notify: boolean;
  archived: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

// Schema definition (assumed to be imported from @/schemas)
const EventsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  venue: z.string().min(1, "Venue is required"),
  date: z.date(),
  link: z.string().url("Must be a valid URL"),
  image: z.array(z.string()).optional(),
  eventType: z.enum(["FEATURED", "UPCOMING", "PAST"]),
  notify: z.boolean(),
  archived: z.boolean(),
  tags: z.array(z.string().min(1, { message: "Tag is required" })),
});

interface EventsFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Event;
  onSuccess?: () => Promise<void>;
}

const EventsForm = ({
  setDialogOpen,
  initialData,
  onSuccess,
}: EventsFormProps) => {
  const [charCount, setCharCount] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialData?.image || []
  );
  const [description, setDescription] = useState<Block[]>([]);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof EventsSchema>>({
    resolver: zodResolver(EventsSchema),
    defaultValues: {
      title: initialData?.title || "",
      venue: initialData?.venue || "",
      link: initialData?.link || "",
      image: initialData?.image || [],
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      eventType: initialData?.eventType || "FEATURED",
      notify: initialData?.notify || false,
      archived: initialData?.archived || false,
      tags: initialData?.tags || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof EventsSchema>) => {
    setLoading(true);
    console.log(data);
    try {
      const endpoint = initialData ? "/api/events/update" : "/api/events/add";
      const method = "POST";

      if (tags.length > 0) {
        form.setValue("tags", tags);
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          id: initialData?.id,
          description: JSON.stringify(description),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (data.notify) {
        //send mail to subscribed users
        const res = await sendEventMail(
          data.title,
          (description[0]?.content as any)?.[0]?.text || "",
          data.date.toString(),
          initialData?.id || result.id
        );
        
        if (!res.success) {
          toast.error("Failed to send mail to subscribed users");
        } else {
          toast.success("Mail sent successfully");
        }
      }

      toast.success(
        initialData ? "Event updated successfully" : "Event added successfully"
      );
      if (onSuccess) await onSuccess();
      setDialogOpen(false);
    } catch (error) {
      console.error("There was a problem with the operation:", error);
      toast.error(
        initialData ? "Failed to update event" : "Failed to add event"
      );
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageUpload = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[]
  ) => {
    if (res && res.length > 0) {
      const fileUrls = res.map((file) => file.url);
      const updatedImages = [...uploadedImages, ...fileUrls];
      setUploadedImages(updatedImages);
      form.setValue("image", updatedImages);
      toast.success("Image uploaded successfully");
    }
  };

  return (
    <Card className="w-[90%] md:w-full h-full md:max-w-4xl mx-auto flex flex-col">
      <CardContent className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Event Images
                      </FormLabel>
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
                            {uploadedImages.map((imageUrl, index) => (
                              <div
                                key={index}
                                className="relative group aspect-square"
                              >
                                <div
                                  className="cursor-pointer rounded-lg overflow-hidden h-full"
                                  onClick={() => {
                                    setSelectedImage(imageUrl);
                                    setShowImageDialog(true);
                                  }}
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`Event image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => {
                                    const updatedImages = uploadedImages.filter(
                                      (_, i) => i !== index
                                    );
                                    setUploadedImages(updatedImages);
                                    form.setValue("image", updatedImages);
                                    toast.success("Image removed");
                                  }}
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
              </div>

              {/* Main Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Title Field */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter event title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Event Type Field */}
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FEATURED">Featured</SelectItem>
                            <SelectItem value="UPCOMING">Upcoming</SelectItem>
                            <SelectItem value="PAST">Past</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Event Tags */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <MultiSelect
                          options={options}
                          name="tags"
                          value={tags}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Archive Checkbox */}
                  <FormField
                    control={form.control}
                    name="archived"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Archive Event</FormLabel>
                          <FormDescription>
                            Move this event to the archives
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  {/* Venue Field */}
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter event venue" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Link Field */}
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter registration URL"
                            type="url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date Field */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-left">DateTime</FormLabel>
                        <Popover>
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value instanceof Date ? (
                                  format(field.value, "PPP HH:mm:ss")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                          </FormControl>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                            <div className="p-3 border-t border-border">
                              <TimePicker12Demo
                                setDate={field.onChange}
                                date={field.value}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  {/* Notification Checkbox */}
                  <FormField
                    control={form.control}
                    name="notify"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 mt-1 leading-none">
                          <FormLabel>Send Notifications</FormLabel>
                          <FormDescription>
                            Notify subscribed users about this event
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Description Field */}
            <Label>Description</Label>
            {initialData ? (
              <UpdateEditor
                setBlocks={setDescription}
                initialContent={initialData.description}
              />
            ) : (
              <AddEditor setBlocks={setDescription} />
            )}

            {/* Submit Button - Fixed at bottom */}
            <div className="sticky -bottom-6 bg-white p-4 -mx-6 mb-6 mt-6 border-t flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    {initialData ? "Updating..." : "Creating..."}
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {initialData ? "Update" : "Create"}
                    {initialData ? (
                      <Pencil className="ml-2 h-4 w-4" />
                    ) : (
                      <PlusCircle className="ml-2 h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      {/* Image Preview Dialog */}
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
    </Card>
  );
};

export default EventsForm;
