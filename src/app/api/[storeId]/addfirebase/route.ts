import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import { NextResponse } from "next/server";

// Constants
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
};

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const {
            products,
            userId,
            paymentPrice,
            name,
            email,
            phone,
            country,
            state,
            city,
            pincode,
            address,
        } = await req.json();

        // Validate required fields
        if (!products || !paymentPrice || !email || !phone || !address) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Create order document
        const orderData = {
            isPaid: false,
            userId,
            name,
            orderItems: products,
            email,
            phone,
            country,
            state,
            city,
            pincode,
            address,
            amount: paymentPrice,
            order_status: "Payment Processing",
            createdAt: serverTimestamp(),
            processingStarted: true,
        };

        // Create Firebase document with retry
        const orderRef = await addDoc(
            collection(db, "stores", params.storeId, "orders"),
            orderData
        );

        return NextResponse.json({
            id: orderRef.id,
            orderData: orderData,
        })
    } catch (error) {
        console.log('Error creating order:', error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500, headers: corsHeaders }
        );
    }
}

