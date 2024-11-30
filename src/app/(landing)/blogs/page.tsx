import React from "react";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import BlogComponent from "./_components/blog-component";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blogs | Jayma Bio Innovations",
};


const Page = () => {
  return (
    <MaxWrapper>
      <BlogComponent />
    </MaxWrapper>
  );
};

export default Page;
