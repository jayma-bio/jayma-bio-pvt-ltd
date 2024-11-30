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
import { ExternalLink, Pencil, ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/shared/loader";
import { getRefunds } from "@/actions/refund/get-refunds";
import { addRefund } from "@/actions/refund/add-refund";
import { updateRefund } from "@/actions/refund/update-refund";
import { deleteRefund } from "@/actions/refund/delete-refund";

export type RefundPolicy = {
  id: string;
  title: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

type FormMode = "add" | "edit" | "view";

export default function RefundPolicyComponent() {
  const [data, setData] = useState<RefundPolicy | null>(null);
  const [loading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("view");
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchRefundPolicy = async () => {
    setLoading(true);
    try {
      const result = await getRefunds();

      if (result.status === 200) {
        setData(result.refund!);
      } else {
        toast.error("Failed to fetch refund policy");
      }
    } catch (error) {
      toast.error("Error fetching refund policy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefundPolicy();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      try {
        const data = await deleteRefund({ id });
        if (data.status === 200) {
          toast.success("Career deleted successfully");
          fetchRefundPolicy();
        } else {
          toast.error("Failed to delete career");
        }
      } catch (error) {
        toast.error("Error deleting career");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitLoading(true);

    const formData = new FormData(event.currentTarget);
    const policyData = {
      title: formData.get("title") as string,
      link: formData.get("link") as string,
    };
    
    try {
      const updateData = { id: data?.id!, ...policyData };
      const result = data
        ? await updateRefund(updateData)
        : await addRefund(policyData);

      if (result.status === 200) {
        toast.success(
          `Refund policy ${data ? "updated" : "created"} successfully`
        );
        resetForm();
        fetchRefundPolicy();
      } else {
        toast.error(
          result.message ||
            `Failed to ${data ? "update" : "create"} refund policy`
        );
      }
    } catch (error) {
      toast.error(`Error ${data ? "updating" : "creating"} refund policy`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetForm = () => {
    setFormMode("view");
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
          {data ? "Edit Return Policy" : "Add Return Policy"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            name="title"
            defaultValue={data?.title}
            required
            placeholder="Enter policy title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="link" className="text-sm font-medium">
            Policy Link
          </label>
          <Input
            id="link"
            name="link"
            type="url"
            defaultValue={data?.link}
            required
            placeholder="Enter policy link"
          />
        </div>

        <Button type="submit" className="w-full" disabled={submitLoading}>
          {!submitLoading ? (
            data ? (
              "Update Policy"
            ) : (
              "Add Policy"
            )
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              {data ? "Updating..." : "Adding..."}
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
          <h1 className="text-2xl font-semibold">Return Policy</h1>
          {!data ? (
            <Button
              onClick={() => setFormMode("add")}
              className="bg-green hover:bg-green/90 px-6"
            >
              Add Policy
            </Button>
          ) : null}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                <TableRow>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="font-medium truncate">{data.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      View Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    {new Date(data.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormMode("edit")}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(data.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No return policy found. Click "Add Policy" to create one.
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
