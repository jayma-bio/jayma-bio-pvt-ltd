import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import PageDetails from "./_components/page-details";

export const metadata: Metadata = {
    title: "Privacy Policy | Jayma Bio Innovations",
  };


  const PrivacyPolicyPage = () => {
    return (
      <MaxWrapper>
        <PageDetails />
      </MaxWrapper>
    )
  };
  
  export default PrivacyPolicyPage;