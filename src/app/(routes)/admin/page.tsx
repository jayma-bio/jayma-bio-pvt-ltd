import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/admin-sidebar-layout/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Jayma Bio Innovations",
};

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white border rounded p-4 h-28 shadow">
            <h2 className="text-xl font-bold">Registered Users</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white border rounded p-4 h-28 shadow">
            <h2 className="text-xl font-bold">Total Products</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white border rounded p-4 h-28 shadow">
            <h2 className="text-xl font-bold">Total Events</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white border rounded p-4 h-28 shadow">
            <h2 className="text-xl font-bold">Total Blogs</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white border rounded p-4 h-28 shadow">
            <h2 className="text-xl font-bold">Archived Products</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white border rounded p-4 h-28 shadow">
            <h2 className="text-xl font-bold">Archived Events</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white border rounded p-4 h-28 shadow">
            <h2 className="text-xl font-bold">Archived Blogs</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
