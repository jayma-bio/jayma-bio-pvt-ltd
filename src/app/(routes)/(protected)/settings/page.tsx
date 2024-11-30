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
import SettingsForm from "@/components/auth/settings-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings | Jayma Bio Innovations",
};

const SettingsPage = () => {
  return (
    <ContentLayout title="Settings">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/profile">Profile</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SettingsForm />
    </ContentLayout>
  );
};

export default SettingsPage;
