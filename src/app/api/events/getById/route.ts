import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

// GET single event by ID
export async function GET(req: Request) {
  const id = await req.json();
  try {
    const event = await prisma.event.findUnique({
      where: { id: id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
