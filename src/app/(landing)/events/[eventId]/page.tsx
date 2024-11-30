import { getEvent } from "@/actions/events/get-event";
import { Metadata } from "next";
import EventsDetails from "./_components/event-details";
import { MaxWrapper } from "@/components/shared/max-wrapper";

interface EventPageProps {
  params: {
    eventId: string;
  };
}
export const metadata: Metadata = {
  title: `Event | Jayma Bio Innovations`,
};

const EventsDetailsPage = async ({ params }: EventPageProps) => {
  const event = await getEvent(params.eventId);
  return (
    <MaxWrapper>
      <EventsDetails event={event.event} />
    </MaxWrapper>
  );
};

export default EventsDetailsPage;
