import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MissionSection = () => {
  const stats = [
    { number: "2022", text: "Started our journey" },
    { number: "50+", text: "Happy customers globally" },
    { number: "3", text: "Major product lines" },
    { number: "1000+", text: "Products sold" },
  ];

  return (
    <section className="w-full bg-[#D9E6BA]" id="mission">
      <div className="w-full flex flex-col items-center max-w-screen-2xl mx-auto h-full mt-14 md:mt-20">
        <div className="w-full flex justify-end items-end">
          <div className="flex justify-center w-[35%] md:w-[20%] items-center self-end gap-2 font-semibold text-xs md:text-[18px] cursor-pointer rounded-bl-3xl relative">
            <img
              src="/landing/misson/curve.svg"
              alt="curve"
              className="w-full select-none pointer-events-none"
            />
            <div className="absolute top-0 left-0 w-full flex items-center justify-center h-full gap-2 pl-3">
              <Link href={"/products"}>
                <span className="text-green">Know more</span>
              </Link>
              <MoveRight className="size-5 md:size-6 shrink-0 text-green" />
            </div>
          </div>
        </div>
        <div className="px-5 md:px-14 flex flex-col md:flex-row w-full gap-5">
          <div className="md:w-1/2 w-full flex flex-col justify-center gap-4 lg:gap-10">
            <h1 className="text-3xl leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-medium tracking-tight text-green line-clamp-6 mb-3 md:mb-0">
              Our Mission
            </h1>
            <p className="w-full md:w-[95%] lg:w-[85%] text-green text-sm md:text-[18px] 2xl:text-[20px] leading-[1.3rem] md:leading-[1.8rem]">
              Our mission is to innovate and create bio-based products that
              prioritize sustainability while fostering a deeper connection
              between people and nature. We are dedicated to developing
              solutions that enhance environmental harmony and promote health
              and well-being. By focusing on eco-friendly practices, we aim to
              inspire others to join us in cultivating a sustainable future.
              Together, we can make a positive and lasting impact on our planet.
            </p>
          </div>

          <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-5 mt-5 md:mt-1">
            <div className="md:w-1/2 w-full flex flex-col gap-5 items-start justify-center">
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5">
                <img
                  src="/landing/hero/1.svg"
                  alt="/landing/hero/1.svg"
                  className="w-9 h-9"
                />
                <div className="flex w-full justify-between">
                  <h1 className="text-green text-2xl font-extra-bold-custom">
                    Since 2022
                  </h1>
                  <Image
                    src={"/landing/misson/misson.svg"}
                    alt="misson"
                    width={130}
                    height={60}
                    className="shrink-0 md:hidden"
                  />
                </div>
                <p className="text-green text-sm md:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD is driven by a passion for
                  sustainability and innovation.
                </p>
              </div>
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5">
                <img
                  src="/landing/hero/2.svg"
                  alt="/landing/hero/2.svg"
                  className="w-9 h-9"
                />
                <div className="flex w-full justify-between">
                  <Image
                    src={"/landing/misson/misson1.svg"}
                    alt="misson"
                    width={130}
                    height={60}
                    className="shrink-0 md:hidden"
                  />
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-green text-2xl font-extra-bold-custom">
                      1000+ Users
                    </h1>
                  </div>
                </div>
                <p className="text-green text-sm md:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD has 1000+ active user everyday
                  from all over the world .
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-5 items-center justify-center md:mt-10">
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5 md:mt-5">
                <img
                  src="/landing/hero/3.svg"
                  alt="/landing/hero/3.svg"
                  className="w-9 h-9"
                />
                <div className="flex w-full justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-green text-2xl font-extra-bold-custom">
                      50+ Customers
                    </h1>
                  </div>
                  <Image
                    src={"/landing/misson/misson.svg"}
                    alt="misson"
                    width={130}
                    height={60}
                    className="shrink-0 md:hidden"
                  />
                </div>
                <p className="text-green text-sm md:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD has more than 50 customers all
                  over the world.
                </p>
              </div>
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5">
                <img
                  src="/landing/hero/4.svg"
                  alt="/landing/hero/4.svg"
                  className="w-8 h-8"
                />
                <div className="flex w-full justify-between">
                  <Image
                    src={"/landing/misson/misson1.svg"}
                    alt="misson"
                    width={130}
                    height={60}
                    className="shrink-0 md:hidden"
                  />
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-green text-2xl font-extra-bold-custom">
                      Expert Team
                    </h1>
                  </div>
                </div>
                <p className="text-green text-sm md:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD has offered extensive
                  distribution and channel sales expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
