export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  cancel_reason?: string;
  category: string;
  size: string;
  qty: number;
}

export interface Category {
  id: string;
  billboardId: string;
  billboardLabel: string;
  name: string;
  description: string;
  banner: string;
  categoryDesc: { video: string; desc: string }[];
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Orders {
  id: string;
  userId: string;
  name: string;
  email: string;
  isPaid: boolean;
  phone: string;
  orderItems: Products[];
  address: string;
  order_status: string;
  session_id: string;
  amount: number;
  isCancelled: boolean;
  isReturned: boolean;
  return_or_refund: string;
  returnImages: { url: string }[];
  cancelled_items: Products[];
  returned_items: Products[];
  refundableamount: number;
  sent_email: boolean;
  paymentId: string;
  return_reason: string;
}
