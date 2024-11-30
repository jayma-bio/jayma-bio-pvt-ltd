"use client";
import AnimatedButton from "@/components/animation/button";
import { MovingCards } from "@/components/shared/moving-card";
import { collaborators } from "@/constants/landing/collaborations";
import Image from "next/image";

const firstRow = collaborators.slice(0, collaborators.length / 2);

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
          {firstRow.map((image, index) => (
            <Image
              key={index}
              src={image.imgUrl}
              alt={index.toString()}
              height={350}
              width={350}
              className="shrink-0 rounded-2xl"
            />
          ))}
        </MovingCards>
      </div>
      <div className="w-full flex items-center justify-center">
        <AnimatedButton buttonText="Know More" link={"/"} />
      </div>
    </section>
  );
};

export default Collaborators;
