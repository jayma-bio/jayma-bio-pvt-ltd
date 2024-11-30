"use client";

import { fetchUser } from "@/actions/fetch-users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfirm } from "@/hooks/use-confirm";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { deleteUser } from "@/actions/delete-user";

interface Users {
  email: string;
  registered: "yes" | "no";
  newsletter: "yes" | "no";
}

const UserComponent = () => {
  const [data, setData] = useState<Users[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [toggled, setToggled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ConfirmDialogue, confirm] = useConfirm(
    "Delete User",
    "Are you sure you want to delete this user ? This action cannot be undone."
  );

  const fetchUserData = async () => {
    try {
      const response = await fetchUser();
      if (response.success && response.users) {
        setData(response.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDelete = async ({ email }: { email: string }) => {
    const ok = await confirm();
    if (ok) {
      try {
        const result = await deleteUser(email);

        if (result.success) {
          toast.success(result.message);
          // Update local state to remove the deleted user
          setData((prev) => prev.filter((user) => user.email !== email));
        } else {
          toast.error(result.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Error deleting user");
      }
    }
  };

  const handleToggle = async (email: string) => {
    setData((prev) =>
      prev.map((user) =>
        user.email === email
          ? {
              ...user,
              newsletter: user.newsletter === "yes" ? "no" : "yes",
            }
          : user
      )
    );

    try {
      const response = await fetch("/api/newsletter/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.status !== 200) {
        toast.success("Failed to toggled");
      } else {
        toast.error("Toggled");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns: ColumnDef<Users>[] = [
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Registered",
      accessorKey: "registered",
      cell: ({ row }) => <span>{row.original.registered}</span>,
    },
    {
      header: "Newsletter",
      accessorKey: "newsletter",
      cell: ({ row }) => (
        <Switch
          checked={
            data.find((user) => user.email === row.original.email)!
              .newsletter === "yes"
          }
          onCheckedChange={() => handleToggle(row.original.email)}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete({ email: row.original.email })}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
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

  return (
    <>
      <ConfirmDialogue />
      <div className="space-y-4">
        <div className="w-full h-full py-4 flex">
          <h1 className="text-2xl font-semibold">Users</h1>
        </div>
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search users..."
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
            <TableBody className="px-4">
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
                    No users found.
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
    </>
  );
};

export default UserComponent;
