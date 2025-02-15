import { Timestamp } from "firebase/firestore";

export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Billboards {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Category {
  id: string;
  billboardId: string;
  billboardLabel: string;
  name: string;
  description: string;
  banner: string;
  categoryDesc: { video: string; desc: string }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Size {
  id: string;
  categoryId: string;
  name: string;
  value: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  qty?: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  cancel_reason?: string;
  category: string;
  size?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Order {
  id: string;
  isPaid: boolean;
  userId: string;
  name: string;
  phone: string;
  email: string;
  orderItems: Product[];
  address: string;
  order_status: string;
  session_id: string;
  amount: number;
  shipment_id: string;
  awb_id: string;
  sent_email: boolean;
  paymentId: string;
  isCancelled: boolean;
  isReturned: boolean;
  return_or_refund: string;
  returnImages: { url: string }[];
  refundableamount: number;
  return_reason: string;
  cancelled_items: Product[];
  returned_items: Product[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
