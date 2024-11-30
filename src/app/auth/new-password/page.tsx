import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jayma Bio Innovations | New Password",
};

const NewPasswordPage = () => {
  return (
    <NewPasswordForm />
  );
}
 
export default NewPasswordPage;