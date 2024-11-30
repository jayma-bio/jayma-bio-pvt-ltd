import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jayma Bio Innovations | Signup",
};

const RegisterPage = () => {
  return (
    <RegisterForm />
  );
}
 
export default RegisterPage;