import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import ContactUsSection from "./_components/contact-us";

export const metadata: Metadata = {
  title: "Contact | Jayma Bio Innovations",
};

const ContactusPage = () => {
  return (
    <MaxWrapper>
      <ContactUsSection />
    </MaxWrapper>
  );
};

export default ContactusPage;
