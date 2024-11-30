import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import PageDetails from "./_components/page-details";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Jayma Bio Innovations",
};

const CancelletionAndRefundPage = () => {
  return (
    <MaxWrapper>
      <PageDetails />
    </MaxWrapper>
  )
};

export default CancelletionAndRefundPage;
