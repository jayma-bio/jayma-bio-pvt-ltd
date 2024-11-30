import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import PageDetails from "./_components/page-details";


export const metadata: Metadata = {
  title: "Terms & Conditions | Jayma Bio Innovations",
};

const TermsAndConditionsPage = () => {
  return (
    <MaxWrapper>
      <PageDetails />
    </MaxWrapper>
  )
};

export default TermsAndConditionsPage;
