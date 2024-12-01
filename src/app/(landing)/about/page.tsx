import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import AboutUsSection from "./_components/about-section";
import { getSupporters } from "@/actions/collab/collabs";

export const metadata: Metadata = {
  title: "About | Jayma Bio Innovations",
};

const AboutUspage = async () => {
  const supports = await getSupporters();
  return (
    <MaxWrapper>
      <AboutUsSection supports={supports} />
    </MaxWrapper>
  );
};

export default AboutUspage;