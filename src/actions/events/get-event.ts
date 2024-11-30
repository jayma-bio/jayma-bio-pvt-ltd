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

export const getEvent = async (eventId: string) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  const event = await prismadb.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error(`Event with id ${eventId} not found`);
  }

  return {
    event: event,
  };
};
