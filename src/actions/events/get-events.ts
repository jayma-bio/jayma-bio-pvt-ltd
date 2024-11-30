"use server";

import prismadb from "@/lib/prismadb";
import { EventType } from "@prisma/client";

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: Date;
  link: string;
  image: string[];
  eventType: EventType;
  notify: boolean;
  archived: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const getAllEvents = async () => {
  try {
    const events = await prismadb.event.findMany();
    console.log(events);
    return { events: events, success: true };
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return { error: "Failed to fetch events", success: false };
  }
};
