import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prismadb.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ events: events, status: 200 });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json({ error: "Failed to fetch events", status: 500 });
  }
}
