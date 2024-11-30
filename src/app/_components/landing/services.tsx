import Image from "next/image";

const logos = [
  {
    name: "Connecting People and Plants",
    url: "/landing/services/image1.jpg",
  },
  {
    name: "Cultivating Nature's Intelligence",
    url: "/landing/services/image2.jpg",
  },
  {
    name: "Innovative and Nature Driven Solution",
    url: "/landing/services/image3.jpg",
  },
  {
    name: "Sustainable Tech for Green-Living",
    url: "/landing/services/image4.png",
  },
  {
    name: "Commitment to Eco-conscious Wellness",
    url: "/landing/services/image5.jpg",
  },
  {
    name: "Bridgeing Research and Real-world Impact",
    url: "/landing/services/image6.jpg",
  },
];

const Services = () => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full md:px-6 max-w-screen-2xl">
        <div
          className="group relative mt-5 md:mt-4 flex gap-6 overflow-hidden py-2 md:py-4 border border-green"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 99%)",
          }}
        >
          {Array(6)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-between items-center gap-10"
              >
                {logos.map((logo, key) => (
                  <div key={key} className="flex items-center gap-4">
                    <Image
                      src={logo.url}
                      height={40}
                      width={40}
                      alt={`${logo.name}`}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <h1 className="text-green text-xl">{logo.name}</h1>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;