import AnimatedButton from "@/components/animation/button";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found | Jayma Bio Innovations",
};

export default function NotFoundPage() {
  return (
    <MaxWrapper>
      <main className="w-full min-h-svh md:min-h-lvh flex items-center md:items-start justify-center notfound-bg md:pt-14">
        <div className="flex flex-col gap-2 items-center justify-center mt-14">
          <img
            src="/not-found/typo.svg"
            alt="typo"
            className="w-[200px] md:w-[300px]"
          />

          <h1 className="text-xl md:text-3xl font-medium text-lightGreen -mt-8">
            <span className="text-white">SORRY, THERE’S</span> NOTHING HERE
          </h1>
          <Link href={"/"}>
            <Button className="w-[160px] md:w-[200px] h-[40px] md:h-[50px] bg-lightGreen hover:bg-lightGreen/90 mt-3 md:mt-6 text-green rounded-full text-lg uppercase font-semibold">
              Return home
            </Button>
          </Link>
        </div>
      </main>
    </MaxWrapper>
  );
}


