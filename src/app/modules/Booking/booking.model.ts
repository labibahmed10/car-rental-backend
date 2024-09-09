import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

// booking schema
const bookingSchema = new Schema<IBooking>(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
      validate: {
        validator: function (v: string) {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return regex.test(v) && !isNaN(new Date(v).getTime());
        },
        message: (props: any) => `${props.value} is not a valid date!`,
      },
    },
    startTime: {
      type: String,
      required: [true, "Start Time is required"],
    },
    endTime: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      required: [true, "Car is required"],
      ref: "Car",
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// booking model
export const BookingModel = model<IBooking>("Booking", bookingSchema);
