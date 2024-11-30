"use client";
import Link from "next/link";
import { useForm } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Loader2, MoveRight } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const Socials = [
  {
    label: "Instagram",
    icon: "/social-icons/instagram.svg",
    link: "https://www.instagram.com/jaymabioinnovations/",
  },
  {
    label: "LinkedIn",
    icon: "/social-icons/linkedin.svg",
    link: "https://www.instagram.com/jaymabioinnovations/",
  },
  {
    label: "Facebook",
    icon: "/social-icons/facebook.svg",
    link: "https://www.instagram.com/jaymabioinnovations/",
  },
  {
    label: "X",
    icon: "/social-icons/x.svg",
    link: "https://www.instagram.com/jaymabioinnovations/",
  },
];
const ContactUsSection = () => {
  const [state, handleSubmit] = useForm("xrbgkwae");
  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully");
      const form = document.getElementById("contactForm") as HTMLFormElement;
      if (form) {
        form.reset();
      }
    }
  }, [state.succeeded]);

  return (
    <section
      id="contact"
      className="w-full h-full pb-8 md:pb-10 px-5 md:px-10 lg:px-24 flex flex-col gap-4 mt-4 md:mt-12"
    >
      <div className="w-full h-full max-w-screen-2xl mx-auto flex flex-col-reverse md:flex-row gap-7 md:gap-4 items-start pt-4 md:pt-10">
        <div className="w-full md:w-1/2 flex items-start justify-start pt-5 md:pt-14">
          <form
            id="contactForm"
            className="w-full flex flex-col items-start justify-start gap-3 md:gap-5"
            onSubmit={handleSubmit}
          >
            <input
              id="name"
              placeholder="Your Name"
              className="w-full md:w-[80%] border-b-2 border-green/80 py-4 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-green placeholder:text-green placeholder:opacity-70 text-green placeholder:text-sm md:placeholder:text-lg text-sm md:text-lg font-medium"
              type="text"
              required
              name="name"
            />
            <input
              id="email"
              placeholder="Your Email"
              className="w-full md:w-[80%] border-b-2 border-green/80 py-4 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-green placeholder:text-green placeholder:opacity-70 text-green placeholder:text-sm md:placeholder:text-lg text-sm md:text-lg font-medium"
              type="text"
              required
              name="email"
            />
            <textarea
              id="message"
              placeholder="Share your thoughts"
              className="w-full md:w-[80%] border-b-2 border-green py-4 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-green/80 placeholder:text-green placeholder:opacity-70 resize-none h-[120px] text-green  font-medium placeholder:text-sm md:placeholder:text-lg text-sm md:text-lg"
              typeof="text"
              required
              name="message"
            />
            <div className="w-full flex items-center justify-center md:justify-start">
              <Button
                type="submit"
                variant="outline"
                disabled={state.submitting}
                className="w-[200px] md:w-[300px] rounded-full border-green py-4 md:py-5 text-sm md:text-lg mt-3 flex items-center gap-2"
              >
                Share Your Feedback
                {state.submitting ? (
                  <Loader2 className="size-8 shrink-0 text-green animate-spin" />
                ) : (
                  <MoveRight className="size-8  shrink-0 text-green " />
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5 items-center md:items-end justify-between h-full md:min-h-[60vh] pt-6 md:pt-14">
          <div className="flex flex-col gap-4 md:gap-5 items-center md:items-end justify-start">
            <h1 className="text-5xl font-semibold text-green hidden md:flex">
              Contact
            </h1>
            <h1 className="text-4xl font-semibold text-green md:hidden">
              Contact Us
            </h1>
            <h1 className="text-5xl font-semibold items-center gap-3 text-green hidden md:flex">
              <span className="w-[120px] h-[4px] bg-green" />
              Us
            </h1>
            <p className="text-sm md:text-lg text-green font-medium w-full md:w-[80%] text-center md:text-right mt-1 md:mt-3">
              It is very important for us to keep in touch with you, so we are
              always ready to answer any question that interests you. Shoot!
            </p>
          </div>
          <div className="w-full flex items-center gap-5 md:gap-7 justify-center mt-4 md:mt-0 md:justify-end">
            {Socials.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                className="flex items-center justify-center"
              >
                <img
                  src={social.icon}
                  alt={social.label}
                  className="size-6 md:size-7 shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
