import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { EventEmitter } from "node:stream";
import { FirebaseError } from "firebase/app";

// Constants
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
};

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

const retryOperation = async (
    operation: () => Promise<any>,
    maxAttempts = 3,
    delay = 1000
): Promise<any> => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (
                error instanceof FirebaseError &&
                (error.code === 'unavailable' || error.code === 'resource-exhausted') &&
                attempt < maxAttempts
            ) {
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
                continue;
            }
            throw error;
        }
    }
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
        const orderRef = await retryOperation(async () => {
            return await addDoc(
                collection(db, "stores", params.storeId, "orders"),
                orderData
            );
        });

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

