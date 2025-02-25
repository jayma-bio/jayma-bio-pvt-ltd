import { NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";
import axios, { AxiosError } from "axios";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const OPTIONS = async () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  Cashfree.XClientId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID as string;
  Cashfree.XClientSecret = process.env
    .NEXT_PUBLIC_CASHFREE_SECRET_KEY as string;
  Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
  
  try {
    const { orderId } = await req.json();

    const data = await Cashfree.PGOrderFetchPayments(
      "2023-08-01",
      orderId as string
    )
      .then(async (response) => {
        console.log("Order fetched successfully:", response.data[0]);
        return response.data[0];
      })
      .catch((error: AxiosError) => {
        console.error("Unexpected error:", error);
        return null;
      });

    console.log(data);

    if (!data) {
      return NextResponse.json(
        { data: null, status: 500 },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { data: data, status: 200 },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: error }, { headers: corsHeaders });
  }
}
