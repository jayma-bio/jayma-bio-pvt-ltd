"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { testimonials } from "@/constants/landing/testimonials";

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(3, 5);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 5,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, userName }) => (
              <div
                className="p-10 border border-solid border-[#222222]/10 rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-sm w-full"
                key={name}
              >
                <div className="text-green font-semibold tracking-wide text-[14px]">
                  {text}
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium text-green tracking-tight leading-5 nunito">
                      {name}
                    </div>
                    <div className="leading-5 text-green tracking-tight text-sm nunito">
                      {userName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="w-full px-5 md:px-14 min-h-screen flex flex-col max-w-screen-2xl mx-auto h-full pt-3 md:pt-6 gap-[1rem] md:gap-[3rem]"
    >
      <div className="flex flex-col md:flex-row">
        <h2 className="text-3xl leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-medium text-green line-clamp-6">
          What Others
        </h2>
        <span className="bg-lightGreen text-green py-0.5 px-3 leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] md:px-4 rounded-full text-3xl 2xl:text-6xl md:text-5xl font-medium items-center justify-center w-24 md:w-auto ml-1">
          Says
        </span>
      </div>
      <div className="flex justify-center my-5 gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn
          testimonials={secondColumn}
          className="hidden md:block"
          duration={19}
        />
        <TestimonialsColumn
          testimonials={thirdColumn}
          className="hidden lg:block"
          duration={17}
        />
      </div>
    </section>
  );
};
