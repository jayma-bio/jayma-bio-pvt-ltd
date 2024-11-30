"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AnimatedButton from "@/components/animation/button";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const CtaNewsLetterSection = () => {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Subscribing...");

    try {
      const response = await fetch("/api/newsletter/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (data.status === 400) {
        toast.error("You are already subscribed.");
      } else if (data.status === 200) {
        toast.success("Newsletter subscription successful!");
        setSubscribed(true);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to subscribe to the newsletter.");
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <section className="w-full h-full md:h-[50vh] flex items-center justify-center px-5 md:px-10 lg:px-13 py-8 lg:py-10 max-w-screen-2xl mx-auto">
      <div className="bg-lightGreen w-full h-full rounded-[2rem] flex flex-col md:flex-row items-center gap-6 px-4 md:px-10">
        <div className="w-full md:w-2/5 flex flex-col items-start md:items-start justify-center gap-3 pt-6 md:py-0 px-2 md:px-0">
          <h1 className="text-xl md:text-3xl tracking-tight font-medium capitalize flex flex-col gap-2">
            Subscribe to our newsletter
          </h1>
          <p className="text-[14px] md:text-medium font-medium text-left">
            Stay Informed: Get the Latest Updates, Bio Tips, and Exclusive
            Offers Straight to Your Inbox!
          </p>
        </div>
        <div className="w-full md:w-3/5 flex flex-col gap-5 items-center justify-center md:pl-10 pb-8 md:pb-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter email"
                        {...field}
                        className="w-[300px] md:w-[370px] rounded-full bg-white text-black border-none"
                      />
                    </FormControl>
                    <FormMessage className="text-sm capitalize" />
                  </FormItem>
                )}
              />

              <AnimatedButton
                buttonText={`${subscribed ? "Subscribed" : "Subscribe"}`}
              />
            </form>
          </Form>
          <p className="text-sm text-center md:text-left hidden md:block">
            By submitting your email address, you agree to receive Jayma Bio
            Innovations monthly newsletter. For more information, please read
            our privacy and policy page.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaNewsLetterSection;
