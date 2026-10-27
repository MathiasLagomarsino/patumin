/** Domain contracts for the next commerce phase. No payment integration is active yet. */
export type PaymentStatus = "pending" | "approved" | "rejected" | "cancelled" | "refunded";
export type ProductionStatus =
  | "waiting_for_photos"
  | "photos_received"
  | "modeling"
  | "awaiting_approval"
  | "approved"
  | "printing"
  | "painting"
  | "preparing_shipment"
  | "shipped"
  | "delivered";
export type ShippingStatus = "not_ready" | "preparing" | "shipped" | "delivered";
export type PetType = "perro" | "gato";

export interface MiniatureDraft {
  version: 1;
  variantId: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export type CustomerErrors = Partial<Record<keyof CustomerDetails, string>>;

export interface Order {
  id: string;
  publicReference: string;
  variantId: string;
  quantity: number;
  petName: string;
  /** Monetary values must be calculated on the server, in integer centavos. */
  subtotalCentavos: number;
  shippingCentavos: number;
  totalCentavos: number;
  currency: "ARS";
  paymentStatus: PaymentStatus;
  productionStatus: ProductionStatus;
  shippingStatus: ShippingStatus;
  createdAt: string;
}
