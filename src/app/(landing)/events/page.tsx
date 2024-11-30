import { MaxWrapper } from "@/components/shared/max-wrapper";
import React from "react";
import EventsSection from "./_components/events-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Jayma Bio Innovations",
};

const EventsPage = () => {
  return (
    <MaxWrapper>
      <EventsSection />
    </MaxWrapper>
  );
};

export default EventsPage;
