import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { id, role, name, email } = await req.json();
  try {
    await prismadb.user.update({
      where: {
        id,
      },
      data: {
        name: name,
        email: email,
        role: role,
      },
    });

    return NextResponse.json({
      message: "User updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while updating the user",
      status: 500,
    });
  }
}