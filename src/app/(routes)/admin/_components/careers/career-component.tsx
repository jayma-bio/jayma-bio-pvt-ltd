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
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Pencil,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Loader from "@/components/shared/loader";
import { useConfirm } from "@/hooks/use-confirm";
import { getCareers } from "@/actions/careers/get-careers";
import { deleteCareer } from "@/actions/careers/delete-career";
import { addCareers } from "@/actions/careers/add-careers";
import { updateCareer } from "@/actions/careers/update-career";

type Career = {
  id: string;
  title: string;
  description: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

type FormMode = "add" | "edit" | "view";

export default function CareerComponent() {
  const [data, setData] = useState<Career[]>([]);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [formMode, setFormMode] = useState<FormMode>("view");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [ConfirmDialogue, confirm] = useConfirm(
    "Delete Career",
    "Are you sure you want to delete this career posting? This action cannot be undone."
  );

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const data = await getCareers();
      if (data.status === 200) {
        setData(data.careers || []);
      } else {
        toast.error("Failed to fetch careers");
      }
    } catch (error) {
      toast.error("Error fetching careers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      try {
        const data = await deleteCareer({ id });
        if (data.status === 200) {
          toast.success("Career deleted successfully");
          fetchCareers();
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
    const careerData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      link: formData.get("link") as string,
    };

    try {
      if (formMode === "edit" && selectedCareer) {
        const data = await updateCareer({
          id: selectedCareer.id,
          ...careerData,
        });

        if (data.status === 200) {
          toast.success("Career updated successfully");
          resetForm();
          fetchCareers();
        } else {
          toast.error(data.message || "Failed to update career");
        }
      } else {
        const data = await addCareers(careerData);

        if (data.status === 200) {
          toast.success("Career added successfully");
          resetForm();
          fetchCareers();
        } else {
          toast.error(data.message || "Failed to add career");
        }
      }
    } catch (error) {
      toast.error(
        `Error ${formMode === "edit" ? "updating" : "adding"} career`
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetForm = () => {
    setFormMode("view");
    setSelectedCareer(null);
  };

  const columns: ColumnDef<Career>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <p className="font-medium truncate">{row.original.title}</p>
        </div>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <div className="max-w-[300px]">
          <p className="truncate">{row.original.description}</p>
        </div>
      ),
    },
    {
      header: "Link",
      accessorKey: "link",
      cell: ({ row }) => (
        <a
          href={row.original.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          Apply <ExternalLink className="w-3 h-3" />
        </a>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCareer(row.original);
              setFormMode("edit");
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

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
          {formMode === "edit" ? "Edit Career" : "Add New Career"}
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
            defaultValue={selectedCareer?.title}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={selectedCareer?.description}
            required
            className="w-full min-h-[100px] p-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="link" className="text-sm font-medium">
            Application Link
          </label>
          <Input
            id="link"
            name="link"
            type="url"
            defaultValue={selectedCareer?.link}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={submitLoading}>
          {!submitLoading ? (
            formMode === "edit" ? (
              "Update Career"
            ) : (
              "Add Career"
            )
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              {formMode === "edit" ? "Updating..." : "Adding..."}
            </div>
          )}
        </Button>
      </form>
    </div>
  );

  const renderTable = () => (
    <div className="container mx-auto p-6 space-y-6">
      <ConfirmDialogue />
      <div className="space-y-4">
        <div className="w-full h-full py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Careers</h1>
          <Button
            onClick={() => setFormMode("add")}
            className="bg-green hover:bg-green/90 px-6 flex items-center gap-2"
          >
            Add Career
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input
            placeholder="Search careers..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(val) => {
                table.setPageSize(Number(val));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select page size" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No careers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          <span className="text-sm text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );

  return formMode !== "view" ? renderForm() : renderTable();
}
