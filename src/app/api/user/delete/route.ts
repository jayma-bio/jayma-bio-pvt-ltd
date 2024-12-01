import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  try {
     await prismadb.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "User Deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while deleting the user",
      status: 500,
    });
  }
}