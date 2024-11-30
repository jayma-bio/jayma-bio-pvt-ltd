"use client";
import Providers from "@/app/_components/provider/query-provider";
import AdminPanelLayout from "@/components/admin-sidebar-layout/sidebar-layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AdminPanelLayout>
        <TooltipProvider>{children}</TooltipProvider>
      </AdminPanelLayout>
    </Providers>
  );
}
