"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { addManagement } from "@/actions/payment-management/add-management";
import { getManagement } from "@/actions/payment-management/get-management";
import { deleteManagement } from "@/actions/payment-management/delete-manangement";
import { updateManagement } from "@/actions/payment-management/update-management";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

type PaymentManagement = {
  id: string;
  shipping: string;
  tax: string;
  createdAt: Date;
  updatedAt: Date;
};

const PaymentManagementComponent = () => {
  const [data, setData] = useState<PaymentManagement[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    shipping: "",
    tax: "",
  });
  const [ConfirmDialogue, confirm] = useConfirm(
    "Delete Order Charges",
    "Are you sure you want to delete this charges? This action cannot be undone."
  );
  const [formData, setFormData] = useState({
    shipping: "",
    tax: "",
  });

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await getManagement();
      if (response.success && response.data) {
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnHelper = createColumnHelper<PaymentManagement>();

  const columns = [
    columnHelper.accessor("shipping", {
      header: "Shipping Charge",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("tax", {
      header: "Tax Charge",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("updatedAt", {
      header: "Updated At",
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => (
        <Button
          size="icon"
          variant="destructive"
          onClick={() => handleDelete(info.getValue())}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitClick = () => {
    if (data.length > 0) {
      // If data exists, open update dialog with existing data
      setUpdateFormData({
        id: data[0].id,
        shipping: data[0].shipping,
        tax: data[0].tax,
      });
      setIsUpdateDialogOpen(true);
    } else {
      // If no data, proceed with add
      handleSubmit();
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateManagement(updateFormData);
      if (response.success) {
        toast.success(response.message);
        setIsUpdateDialogOpen(false);
        setFormData({
          shipping: "",
          tax: "",
        });
        await fetchData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await addManagement(formData);
      if (response.success) {
        toast.success(response.message);
        setFormData({
          shipping: "",
          tax: "",
        });
        await fetchData();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const ok = await confirm();
    if (ok) {
      try {
        await deleteManagement({ id }).then(async (res) => {
          if (res.success) {
            toast.success(res.message);
            await fetchData();
          }
        });
      } catch (error) {
        console.error("Error deleting data:", error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <ConfirmDialogue />
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Management</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Shipping Charge in Rs."
              name="shipping"
              value={updateFormData.shipping}
              onChange={handleUpdateInputChange}
              disabled={loading}
            />
            <Input
              placeholder="Tax Charge in %"
              name="tax"
              value={updateFormData.tax}
              onChange={handleUpdateInputChange}
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="w-full mx-auto mt-8">
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              {data.length === 0 && (
                <>
                  <Input
                    placeholder="Shipping Charge in Rs."
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <Input
                    placeholder="Tax Charge in %"
                    name="tax"
                    value={formData.tax}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </>
              )}
              <Button
                className="h-[45px]"
                onClick={handleSubmitClick}
                disabled={loading}
                size="lg"
              >
                {loading ? "Loading..." : data.length === 0 ? "Add" : "Update"}
              </Button>
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
                  {table.getRowModel().rows.length > 0 ? (
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
                        No data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentManagementComponent;
