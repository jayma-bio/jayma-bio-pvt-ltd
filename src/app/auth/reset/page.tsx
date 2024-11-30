import { ResetForm } from "@/components/auth/reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jayma Bio Innovations | Reset Password",
};

const ResetPage = () => {
  return <ResetForm />;
};

export default ResetPage;
