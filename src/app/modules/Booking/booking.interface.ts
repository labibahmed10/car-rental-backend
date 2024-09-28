import { Types } from "mongoose";
type BookingStatus = "ongoing" | "complete";
// booking interface
export interface IBooking {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
  status: BookingStatus;
}

export interface IBookingPayload {
  date: string;
  carId: string;
  startTime: string;
}
