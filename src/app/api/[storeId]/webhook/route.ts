import { axiosinstance } from "@/lib/axios";
import { db } from "@/lib/firebase";
import {
  sendOrderPlacedMailtoAdmin,
  sendOrderPlacedMailtoUser,
} from "@/lib/mail";
import { Order } from "@/types-db";
import { FirebaseError } from "firebase/app";
import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
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

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

// Retry function for Firebase operations
const retryOperation = async (operation: () => Promise<any>, maxAttempts = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'unavailable' &&
        attempt < maxAttempts
      ) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
        continue;
      }
      throw error;
    }
  }
};

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { orderId, paymentId, status } = await req.json();

    // Get order with retry
    const orderDoc = await retryOperation(async () =>
      await getDoc(doc(db, "stores", params.storeId, "orders", orderId))
    );

    if (!orderDoc.exists()) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const order = orderDoc.data() as Order;

    if (status === "success" || status === "SUCCESS") {
      const items_name = order.orderItems.map((item) => item.name).join(", ");

      // Send emails
      const emailPromises = [];
      try {
        emailPromises.push(
          sendOrderPlacedMailtoUser({
            name: order.name,
            email: order.email,
            orderId: order.id,
            amount: order.amount.toString(),
            date: order.createdAt.toDate().toISOString(),
            items_name: items_name,
            paymentId: order.paymentId,
            storeId: params.storeId,
          })
        );

        emailPromises.push(
          sendOrderPlacedMailtoAdmin({
            name: order.name,
            orderId: order.id,
            amount: order.amount.toString(),
            date: order.createdAt.toDate().toISOString(),
            items_name: items_name,
            paymentId: order.paymentId,
            storeId: params.storeId,
          })
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue execution even if email fails
      }

      const [userEmailInfo] = await Promise.allSettled(emailPromises);

      // Update order with retry
      await retryOperation(async () =>
        await updateDoc(doc(db, "stores", params.storeId, "orders", orderId), {
          isPaid: true,
          paymentId: paymentId,
          order_status: "Payment Successful",
          sent_email: userEmailInfo.status === 'fulfilled' && userEmailInfo.value?.messageId ? true : false,
          updatedAt: serverTimestamp(),
        })
      );
    } else {
      // Update failed payment status with retry
      await retryOperation(async () =>
        await updateDoc(doc(db, "stores", params.storeId, "orders", orderId), {
          order_status: "Payment Failed",
          updatedAt: serverTimestamp(),
        })
      );
    }

    return NextResponse.json(
      { message: "Db updated", status: 200 },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Webhook error:", error);

    const errorResponse = {
      message: "Internal server error",
      error: error instanceof FirebaseError ? error : 'unknown',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, headers: corsHeaders }
    );
  }
}