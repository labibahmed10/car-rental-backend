import { Types } from "mongoose";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

type PaymentMethod = "cash" | "card" | "online";
// booking interface
export interface IBooking {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
  status: BookingStatus;
  nidOrPassport: string;
  drivingLicense: string;
  paymentMethod: PaymentMethod;
  accountNo?: string;
}

export interface IBookingPayload {
  date: string;
  carId: string;
  startTime: string;
}
