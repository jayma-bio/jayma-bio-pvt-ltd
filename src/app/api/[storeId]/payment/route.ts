import { db } from "@/lib/firebase";
import {
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Cashfree } from "cashfree-pg";

export async function POST(
    req: NextRequest,
    { params }: { params: { storeId: string } }
) {
    Cashfree.XClientId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID as string;
    Cashfree.XClientSecret = process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY as string;
    Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

    try {
        const { userId, phone, email, name, paymentPrice, id, shipment_id, orderData } = await req.json();

        // Input validation
        if (!userId || !phone || !email || !name || !paymentPrice || !id || !shipment_id || !orderData) {
            console.log("Missing required fields:", {
                userId,
                phone,
                email,
                name,
                paymentPrice,
                id,
                shipment_id,
                orderData
            });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create Cashfree order
        const payload = {
            customer_details: {
                customer_id: userId,
                customer_phone: phone,
                customer_email: email,
                customer_name: name,
            },
            order_meta: {
                return_url: process.env.FRONTEND_URL! + `?orderId=${id}`,
            },
            order_id: id,
            order_amount: paymentPrice,
            order_currency: "INR",
        };

        const data = await Cashfree.PGCreateOrder("2023-08-01", payload)
            .then((response: { data: any }) => {
                console.log("Order created successfully:", response.data);
                return response.data;
            })
            .catch((error: any) => {
                console.error("Cashfree Error:", error.response?.data?.message || error.message);
                return null;
            });

        if (!data) {
            return NextResponse.json(
                { error: "Failed to create payment order" },
                { status: 500 }
            );
        }

        const docRef = doc(db, "stores", params.storeId, "orders", id);
        await updateDoc(docRef, {
            ...orderData,
            id,
            session_id: data.payment_session_id,
            shiprocket_id: shipment_id,
            updatedAt: serverTimestamp(),
        });

        const paymentUrl = new URL(process.env.PAYMENT_URL! || "");
        paymentUrl.searchParams.append("session_id", data.payment_session_id!);
        paymentUrl.searchParams.append("store_id", params.storeId);
        paymentUrl.searchParams.append("order_id", id);

        return NextResponse.json({
            url: paymentUrl.toString(),
            orderId: id,
            session_id: data.payment_session_id
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true"
            }
        });
    }
}