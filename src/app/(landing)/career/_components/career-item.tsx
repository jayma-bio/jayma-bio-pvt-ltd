import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

interface CareerItemProps {
  career: any;
}
const CareerItem = ({ career }: CareerItemProps) => {
  return (
    <div className="w-full py-4 md:py-6 border border-l-transparent border-r-transparent border-t-green border-b-transparent flex flex-col md:flex-row gap-2 md:gap-4 justify-between">
      <div className="w-full md:w-[70%] flex items-start gap-2 flex-col">
        <h1 className="text-green font-semibold text-lg md:text-2xl">
          {career?.title}
        </h1>
        <p className="text-sm md:text-medium text-green text-left font-medium">
          {career?.description}
        </p>
      </div>
      <div className="w-full md:w-[30%] flex items-center justify-end md:justify-center">
        <Link href={`${career?.link}`}>
          <Button
            variant="ghost"
            className="text-green border-none w-[160px] md:w-[200px] text-sm md:text-xl flex items-center justify-center font-medium"
            size={"lg"}
          >
            Apply Now
            <MoveUpRight className="size-5 md:size-9 shrink-0" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CareerItem;
