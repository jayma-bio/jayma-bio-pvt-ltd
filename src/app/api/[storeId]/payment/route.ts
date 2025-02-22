import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
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

        if (!userId || !phone || !email || !name || !paymentPrice || !id || !shipment_id || !orderData) {
            console.log({
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
                { error: "Invalid request" },
                { status: 400 }
            );
        }

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
                console.error("Error Cashfree:", error.response.data.message);
                return null;
            });

        if (!data) {
            return NextResponse.json(
                { error: "Failed to create order" },
                { status: 500 }
            );
        }

        await updateDoc(doc(db, "stores", params.storeId, "orders", id), {
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

        return NextResponse.json({ url: paymentUrl.toString() });
    } catch (error) {
        console.error("Error processing request:", error);
        return new NextResponse(JSON.stringify({
            error: "Internal Server Error",
            details: (error as Error).message
        }), {
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