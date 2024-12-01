import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();

    // Create event with nested socials in a single transaction
    const event = await prisma.event.create({
      data: body,
    });

    return NextResponse.json({
      message: "Event created",
      status: 200,
    });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json({ error: "Failed to create event", status: 500 });
  }
}
