"use client";
import AnimatedButton from "@/components/animation/button";
import { MovingCards } from "@/components/shared/moving-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { collaborators } from "@/constants/landing/collaborations";
import Image from "next/image";

const Collaborators = () => {
  return (
    <section className="w-full px-5 md:px-10 flex flex-col max-w-screen-2xl mx-auto h-full py-10 lg:pt-10 gap-[1.6rem] md:gap-[2rem] lg:gap-[3rem] 2xl:gap-[5rem]">
      <div className="lg:py-2">
        <h2 className="text-3xl leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-medium text-green line-clamp-6">
          Recent Collaborations <br />&{" "}
          <span className="bg-lightGreen text-green py-0.5 px-3 leading-[2.8rem] md:leading-[4.2rem] 2xl:leading-[5.3rem] md:px-4 rounded-full text-3xl 2xl:text-6xl md:text-5xl font-medium items-center justify-center">
            Innovations
          </span>
        </h2>
      </div>

      <div className="h-full w-full flex items-center justify-center md:gap-5 gap-2">
        <MovingCards pauseOnHover className="[--duration:50s]">
          {collaborators.map((item, index) => (
            <Card className="w-[360px] h-full rounded-xl mx-2" key={index}>
              <img
                src={item.image}
                alt="collaborator"
                className="rounded-t-xl"
              />
              <div className="w-full h-full px-4 py-3 flex flex-col gap-2">
                <p className="text-sm text-green font-medium min-h-[12vh]">
                  {item.description}
                </p>
                {item.fundingAgency}
                <br />
                <div className="w-full flex items-center gap-2">
                  <Badge className="px-2 py-1">{item.timeStamp}</Badge>
                  <Badge className="px-2 py-1">{item.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </MovingCards>
      </div>
    </section>
  );
};

export default Collaborators;
