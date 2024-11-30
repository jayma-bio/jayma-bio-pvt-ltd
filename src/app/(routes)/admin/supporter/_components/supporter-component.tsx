"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/shared/loader";
import {
  addSupporter,
  deleteSupporter,
  getSupporters,
  updateSupporter,
} from "@/actions/collab/collabs";
import { UploadDropzone } from "@/lib/uplaodthing";
import { ClientUploadedFileData } from "uploadthing/types";

export type Supporter = {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

type FormMode = "add" | "edit" | "view";

export default function SupporterComponent() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("view");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedSupporter, setSelectedSupporter] = useState<Supporter | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const fetchSupporters = async () => {
    setLoading(true);
    try {
      const result = await getSupporters();
      setSupporters(result);
    } catch (error) {
      toast.error("Error fetching supporters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupporters();
  }, []);

  // Set the uploaded image when editing a supporter
  useEffect(() => {
    if (selectedSupporter) {
      setUploadedImage(selectedSupporter.image);
    } else {
      setUploadedImage("");
    }
  }, [selectedSupporter]);

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      try {
        const result = await deleteSupporter(id);
        if (result.success) {
          toast.success("Supporter deleted successfully");
          fetchSupporters();
        } else {
          toast.error("Failed to delete supporter");
        }
      } catch (error) {
        toast.error("Error deleting supporter");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitLoading(true);

    const formData = new FormData(event.currentTarget);
    const supporterData = {
      name: formData.get("name") as string,
      image: uploadedImage,
    };

    // Validate if image exists
    if (!uploadedImage) {
      toast.error("Please upload an image");
      setSubmitLoading(false);
      return;
    }

    try {
      const result = selectedSupporter
        ? await updateSupporter(selectedSupporter.id, supporterData)
        : await addSupporter(supporterData);

      if (result.success) {
        toast.success(
          `Supporter ${selectedSupporter ? "updated" : "created"} successfully`
        );
        resetForm();
        fetchSupporters();
      } else {
        toast.error(
          `Failed to ${selectedSupporter ? "update" : "create"} supporter`
        );
      }
    } catch (error) {
      toast.error(
        `Error ${selectedSupporter ? "updating" : "creating"} supporter`
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetForm = () => {
    setFormMode("view");
    setSelectedSupporter(null);
    setUploadedImage("");
  };

  const handleImageUpload = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[]
  ) => {
    if (res && res.length > 0) {
      setUploadedImage(res[0].url);
      toast.success("Image uploaded successfully");
    }
  };

  if (loading) {
    return <Loader />;
  }

  const renderForm = () => (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={resetForm}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-semibold">
          {selectedSupporter ? "Edit Supporter" : "Add Supporter"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            defaultValue={selectedSupporter?.name}
            required
            placeholder="Enter supporter name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image</label>
          {/* Show current image if editing */}
          {uploadedImage && (
            <div className="mb-4">
              <img
                src={uploadedImage}
                alt="Current Image"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          )}

          {/* Option to replace image */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {uploadedImage ? "Replace image:" : "Upload image:"}
            </p>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={handleImageUpload}
              onUploadError={(error: Error) => {
                toast.error("Image upload failed");
              }}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={submitLoading || !uploadedImage}
        >
          {!submitLoading ? (
            selectedSupporter ? (
              "Update Supporter"
            ) : (
              "Add Supporter"
            )
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              {selectedSupporter ? "Updating..." : "Adding..."}
            </div>
          )}
        </Button>
      </form>
    </div>
  );

  const renderTable = () => (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="w-full h-full py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Supporters</h1>
          <Button
            onClick={() => setFormMode("add")}
            className="bg-green hover:bg-green/90 px-6"
          >
            Add Supporter
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supporters.length > 0 ? (
                supporters.map((supporter) => (
                  <TableRow key={supporter.id}>
                    <TableCell>
                      <img
                        src={supporter.image}
                        alt={supporter.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="font-medium truncate">{supporter.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(supporter.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSupporter(supporter);
                          setFormMode("edit");
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(supporter.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No supporters found. Click "Add Supporter" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );

  return formMode !== "view" ? renderForm() : renderTable();
}
