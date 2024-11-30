"use client";
import { useEffect, useState } from "react";
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
import { ExternalLink, Pencil, Plus, Trash2, ArrowLeft } from "lucide-react";
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
import { EventType } from "@prisma/client";
import { getAllEvents } from "@/actions/events/get-events";
import EventsForm from "./events-card";
import { format } from "date-fns";

export type Event = {
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

export default function EventsPage() {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [ConfirmDialogue, confirm] = useConfirm(
    "Delete Event",
    "Are you sure you want to delete this event? This action cannot be undone."
  );

  const fetchEvents = async () => {
    try {
      await getAllEvents().then((data) => {
        if (data.success) {
          if (data.events) {
            setData(data.events);
          } else {
            setData([]);
          }
        } else {
          toast.error("Failed to fetch events");
        }
      });
    } catch (error) {
      toast.error("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      try {
        const response = await fetch("/api/events/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.status === 200) {
          toast.success("Event deleted successfully");
          fetchEvents();
        } else {
          toast.error("Failed to delete event");
        }
      } catch (error) {
        toast.error("Error deleting event");
      }
    }
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedEvent(null);
    setShowForm(true);
  };

  const columns: ColumnDef<Event>[] = [
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
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => (
        <span>
          {format(new Date(row.original.date), "dd MMM yyyy, hh:mm a")}
        </span>
      ),
    },
    {
      header: "Venue",
      accessorKey: "venue",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.venue}</span>
      ),
    },
    {
      header: "Link",
      accessorKey: "link",
      cell: ({ row }) =>
        row.original.link ? (
          <a
            href={row.original.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            Visit <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-gray-500">-</span>
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
            onClick={() => handleEdit(row.original)}
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {!showForm ? (
        <>
          <ConfirmDialogue />
          <div className="space-y-4">
            <div className="w-full h-full py-4 flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Events</h1>
              <Button
                onClick={handleAddNew}
                className="bg-green hover:bg-green/90 px-6 flex items-center gap-2"
              >
                Add Event
                <Plus className="size-5 shrink-0" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <Input
                placeholder="Search events..."
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
                        No events found.
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
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
            <h1 className="text-2xl font-semibold">
              {selectedEvent ? "Edit Event" : "Add New Event"}
            </h1>
          </div>
          <EventsForm
            setDialogOpen={setShowForm}
            initialData={selectedEvent || undefined}
            onSuccess={async () => {
              await fetchEvents();
              setShowForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
