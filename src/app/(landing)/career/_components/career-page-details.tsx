import { Button } from "@/components/ui/button";
import CareerItem from "./career-item";
import { Careers } from "@prisma/client";

interface CareerPageDetailsProps {
  careers: any;
}

const CarrerPageDetails = ({ careers }: CareerPageDetailsProps) => {
  return (
    <section className="mt-8 md:mt-12 py-4 md:py-8 max-w-screen-2xl mx-auto min-h-screen px-5 md:px-10 lg:px-14 flex flex-col gap-8">
      <div className="w-full flex items-center justify-start md:mt-4">
        <div className="flex flex-col gap-2 md:gap-4">
          <Button
            variant="outline"
            className="text-green w-[160px] md:w-[200px] rounded-full border border-green text-sm md:text-medium flex items-center justify-center font-medium pointer-events-none select-none"
          >
            We are hiring
          </Button>

          <h1 className="text-left text-3xl md:text-5xl font-bold text-green">
            Be part of our mission
          </h1>
          <p className="text-green text-sm md:text-lg font-medium">
            We are looking for passionate people to join us on our mission.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 mt-3 md:mt-6">
        {careers?.map((career: Careers) => (
          <CareerItem key={career.id} career={career} />
        ))}
      </div>
    </section>
  );
};

export default CarrerPageDetails;
