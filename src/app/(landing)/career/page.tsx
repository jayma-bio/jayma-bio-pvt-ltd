import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import CarrerPageDetails from "./_components/career-page-details";
import { getCareers } from "@/actions/careers/get-careers";

export const metadata: Metadata = {
  title: "Career | Jayma Bio Innovations",
};

const CareerPage = async () => {
  const { careers } = await getCareers();
  
  return (
    <MaxWrapper>
      <CarrerPageDetails careers={careers} />
    </MaxWrapper>
  );
};

export default CareerPage;
