import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import AboutUsSection from "./_components/about-section";


export const metadata: Metadata = {
  title: "About | Jayma Bio Innovations",
};

const AboutUspage = async () => {

  return (
    <MaxWrapper>
      <AboutUsSection  />
    </MaxWrapper>
  );
};

export default AboutUspage;
