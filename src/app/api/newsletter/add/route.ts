import { subcribedNewsleter } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newsletter = await prismadb.newsletter.findUnique({
      where: {
        email: body.email,
      },
    });

    if (newsletter) {
      try {
        await subcribedNewsleter(body.email);
      } catch (error) {
        console.log(error);
        return NextResponse.json({
          message: "Error sending email",
          status: 500,
        });
      }
    } else {
      await prismadb.newsletter.create({
        data: {
          email: body.email,
        },
      });

      try {
        await subcribedNewsleter(body.email);
      } catch (error) {
        console.log(error);
        return NextResponse.json({
          message: "Error sending email",
          status: 500,
        });
      }
    }
    
    return NextResponse.json({
      message: "Email added to newsletter",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error adding email to newsletter",
      status: 500,
    });
  }
}
