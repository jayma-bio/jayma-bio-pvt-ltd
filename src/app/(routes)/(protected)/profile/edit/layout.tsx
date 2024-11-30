import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | Jayman Bio Innovations",
};

export default function Editinglayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
