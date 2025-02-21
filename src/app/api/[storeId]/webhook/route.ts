import { axiosinstance } from "@/lib/axios";
import { db } from "@/lib/firebase";
import {
  sendOrderPlacedMailtoAdmin,
  sendOrderPlacedMailtoUser,
} from "@/lib/mail";
import { Order } from "@/types-db";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { EventEmitter } from "node:stream";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const OPTIONS = async () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

const emitter = new EventEmitter()
emitter.setMaxListeners(0)

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { orderId, paymentId, status } = await req.json();
    
    const order = (
      await getDoc(doc(db, "stores", params.storeId, "orders", orderId))
    ).data() as Order;

    if (status === "success" || status === "SUCCESS") {
      const token = await axiosinstance.post("/auth/login", {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }).then((response) => {
        console.log("Logged in successfully:", response.data);
        return response.data.token;
      }).catch((error) => {
        console.error("Error:", error.response.data.message);
        return null;
      });

      const items_name = order.orderItems.map((item) => item.name).join(", ");
      const info1 = await sendOrderPlacedMailtoUser({
        name: order.name,
        email: order.email,
        orderId: order.id,
        amount: order.amount.toString(),
        date: order.createdAt.toDate().toISOString(),
        items_name: items_name,
        paymentId: order.paymentId,
        storeId: params.storeId,
      });

      const generatedAWB = await axiosinstance.post("/courier/assign/awb", {
        shipment_id: order.shipment_id,
      },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }).then((response) => {
          console.log("AWB generated successfully:", response.data);
          return response.data;
        }).catch((error) => {
          console.error("Error:", error.response.data.message);
          return null;
        });

      if (!generatedAWB) {
        return NextResponse.json(
          { error: "Failed to generate AWB" },
          { status: 500, headers: corsHeaders }
        );
      }

      console.log("Generated AWB:", generatedAWB);

      await sendOrderPlacedMailtoAdmin({
        name: order.name,
        orderId: order.id,
        amount: order.amount.toString(),
        date: order.createdAt.toDate().toISOString(),
        items_name: items_name,
        paymentId: order.paymentId,
        storeId: params.storeId,
      });

      await updateDoc(doc(db, "stores", params.storeId, "orders", orderId), {
        isPaid: true,
        paymentId: paymentId,
        order_status: "Payment Successful",
        sent_email: info1.messageId ? true : false,
        awb_id: generatedAWB.response.data.awb_code,
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, "stores", params.storeId, "orders", orderId), {
        order_status: "Payment Failed",
        updatedAt: serverTimestamp(),
      });
    }

    return NextResponse.json(
      { message: "Db updated", status: 200 },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: error }, { headers: corsHeaders });
  }
}
