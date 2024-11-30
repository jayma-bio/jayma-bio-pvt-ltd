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
import { Pencil, Plus, Trash2, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import Loader from "@/components/shared/loader";
import { useConfirm } from "@/hooks/use-confirm";
import { getAll } from "@/actions/endpoint/get-all";
import { deleteEndpoint } from "@/actions/endpoint/delete-endpoint";
import { addEndpoint } from "@/actions/endpoint/add-endpoints";
import { updateEndpoint } from "@/actions/endpoint/update-endpoint";

export type Endpoint = {
  id: string;
  baseUrl: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface EndpointCardProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Endpoint;
  onSuccess?: () => Promise<void>;
}

const EndpointCard: React.FC<EndpointCardProps> = ({
  setDialogOpen,
  initialData,
  onSuccess,
}) => {
  const [baseUrl, setBaseUrl] = useState(initialData?.baseUrl || "");
  const [storeId, setStoreId] = useState(initialData?.storeId || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isUpdate = !!initialData;
      const payload = isUpdate
        ? { id: initialData.id, baseUrl, storeId }
        : { baseUrl, storeId };

      if (isUpdate) {
        await updateEndpoint(payload).then((data) => {
          if (data.success) {
            toast.success("Endpoint updated successfully");
            setDialogOpen(false);
            onSuccess && onSuccess();
          } else {
            toast.error("Failed to update endpoint");
          }
        });
      } else {
        await addEndpoint(payload).then((data) => {
          if (data.success) {
            toast.success("Endpoint created successfully");
            setDialogOpen(false);
            onSuccess && onSuccess();
          } else {
            toast.error("Failed to create endpoint");
          }
        });
      }
    } catch (error) {
      toast.error("Error saving endpoint");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Endpoint" : "Add New Endpoint"}
      </h2>
      <div className="grid gap-4">
        <div>
          <label className="block mb-2">Base URL</label>
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Enter base URL"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Store ID</label>
          <Input
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            placeholder="Enter store ID"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default function EndpointsTable() {
  const [data, setData] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ConfirmDialogue, confirm] = useConfirm(
    "Delete Endpoint",
    "Are you sure you want to delete this endpoint? This action cannot be undone."
  );

  const fetchEndpoints = async () => {
    try {
      await getAll().then((data) => {
        if (data.success) {
          setData(data.data!);
        } else {
          toast.error("Failed to fetch endpoints");
        }
      });
    } catch (error) {
      toast.error("Error fetching endpoints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEndpoints();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      try {
        await deleteEndpoint(id).then((data) => {
          if (data.success) {
            toast.success("Endpoint deleted successfully");
            fetchEndpoints();
          } else {
            toast.error("Failed to delete endpoint");
          }
        });
      } catch (error) {
        toast.error("Error deleting endpoint");
      }
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  const columns: ColumnDef<Endpoint>[] = [
    {
      header: "Base URL",
      accessorKey: "baseUrl",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span>{row.original.baseUrl}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(row.original.baseUrl)}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      ),
    },
    {
      header: "Store ID",
      accessorKey: "storeId",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span>{row.original.storeId}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(row.original.storeId)}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
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
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEndpoint(row.original)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              {selectedEndpoint && (
                <EndpointCard
                  setDialogOpen={setUpdateDialogOpen}
                  initialData={selectedEndpoint}
                  onSuccess={fetchEndpoints}
                />
              )}
            </DialogContent>
          </Dialog>
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

  return (
    <>
      <ConfirmDialogue />
      <div className="space-y-4">
        <div className="w-full h-full py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Endpoints</h1>
          <Dialog
            open={dialogOpen || (data.length === 1 && updateDialogOpen)}
            onOpenChange={
              data.length === 1 ? setUpdateDialogOpen : setDialogOpen
            }
          >
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  if (data.length === 1) {
                    setSelectedEndpoint(data[0]);
                    setUpdateDialogOpen(true);
                  } else {
                    setDialogOpen(true);
                  }
                }}
              >
                {data.length === 1 ? "Update Endpoint" : "Add Endpoint"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <EndpointCard
                setDialogOpen={
                  data.length === 1 ? setUpdateDialogOpen : setDialogOpen
                }
                initialData={data.length === 1 ? data[0] : undefined}
                onSuccess={fetchEndpoints}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex w-full justify-start py-4">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />
        </div>
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
            {table.getRowModel().rows?.length ? (
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
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
