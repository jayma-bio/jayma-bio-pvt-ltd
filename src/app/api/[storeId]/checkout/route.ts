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
import { axiosinstance } from "@/lib/axios";
import { EventEmitter } from "node:stream";
import { FirebaseError } from "firebase/app";

// Interfaces
interface ShipRocketResponse {
  shipment_id: number;
  // Add other properties from the API response as needed
}

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface OrderData {
  isPaid: boolean;
  userId: string;
  name: string;
  orderItems: OrderItem[];
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  amount: number;
  order_status: string;
  createdAt: any; // FirebaseFirestore.FieldValue
  processingStarted: boolean;
}

interface ShipRocketOrderData {
  order_id: string;
  order_date: string;
  pickup_location: string;
  channel_id: string;
  billing_customer_name: string;
  billing_last_name: string;
  billing_address: string;
  billing_address_2: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: {
    name: string;
    sku: string;
    units: number;
    selling_price: number;
  }[];
  payment_method: string;
  sub_total: number;
  length: string;
  breadth: string;
  height: string;
  weight: string;
}

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

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Main handler
export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
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
      token
    } = await req.json();

    // Validate required fields
    if (!products || !paymentPrice || !email || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create order document
    const orderData: OrderData = {
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

    const id = orderRef.id;

    // Prepare Shiprocket order data
    const shipRocketOrderData: ShipRocketOrderData = {
      order_id: id,
      order_date: formatDate(new Date()),
      pickup_location: process.env.SHIPROCKET_PICKUP_LOC || "",
      channel_id: "6085137",
      billing_customer_name: name.split(" ")[0],
      billing_last_name: name.split(" ")[1] || "",
      billing_address: address,
      billing_address_2: "",
      billing_city: city,
      billing_pincode: pincode,
      billing_state: state,
      billing_country: country,
      billing_email: email,
      billing_phone: phone,
      shipping_is_billing: true,
      order_items: products.map((item: OrderItem) => ({
        name: item.name,
        sku: item.id,
        units: item.qty,
        selling_price: item.price
      })),
      payment_method: "Prepaid",
      sub_total: paymentPrice,
      length: "10",
      breadth: "10",
      height: "10",
      weight: "1"
    };

    // Create Shiprocket order with timeout
    const shipRocketPromise = new Promise<ShipRocketResponse>(async (resolve, reject) => {
      try {
        const response = await axiosinstance.post<ShipRocketResponse>(
          "/orders/create/adhoc",
          shipRocketOrderData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            timeout: 8000
          }
        );
        resolve(response.data);
      } catch (error: any) {
        console.error("Shiprocket Error:", error.response?.data?.message || error.message);
        reject(error);
      }
    });

    // Wait for Shiprocket order with timeout
    const createShipRocketOrder = await Promise.race([
      shipRocketPromise,
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Shiprocket timeout")), 8000)
      )
    ]).catch(error => {
      console.error("Shiprocket order creation failed:", error);
      return null;
    });

    // Update order with shipment ID if available
    if (createShipRocketOrder?.shipment_id) {
      await retryOperation(async () => {
        await updateDoc(doc(db, "stores", params.storeId, "orders", id), {
          shipment_id: createShipRocketOrder.shipment_id,
          shiprocket_status: "created"
        });
      });
    }

    return NextResponse.json({
      id,
      shipment_id: createShipRocketOrder?.shipment_id,
      orderData
    }, {
      headers: corsHeaders
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, {
      status: 500,
      headers: corsHeaders
    });
  }
}