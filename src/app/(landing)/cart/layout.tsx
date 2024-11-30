import { TooltipProvider } from "@/components/ui/tooltip";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout | Jayma Bio Innovations",
};

const cartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
};

export default cartLayout;
