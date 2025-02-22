import { axiosinstance } from "@/lib/axios";
import { db } from "@/lib/firebase";
import {
  sendOrderPlacedMailtoAdmin,
  sendOrderPlacedMailtoUser,
} from "@/lib/mail";
import { Order } from "@/types-db";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
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
