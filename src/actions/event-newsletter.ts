"use server";

import { sendEventNewsletter } from "@/lib/mail";
import prismadb from "@/lib/prismadb";

export async function sendEventMail(
  title: string,
  description: string,
  date: string,
  eventId: string
) {
  // Send an email to all users about the event
  try {
    const users = await prismadb.newsletter.findMany();
    const emails = users.map((user) => user.email);
    let accepted = [];
    await Promise.all(
      emails.map(async (email) => {
        const res = await sendEventNewsletter(email!, title, description, date, eventId);

        if (res.accepted) {
          accepted.push(res.accepted);
        }
      })
    );

    if (accepted.length === emails.length) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
