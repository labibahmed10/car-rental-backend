import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";
import { bookingStatus, paymentMethod } from "./booking.constant";

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

    status: {
      type: String,
      enum: bookingStatus,
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: paymentMethod,
      // required: [true, "Payment method is required"],
    },

    nidOrPassport: {
      type: String,
      // required: [true, "Nid  or Passport ID is required"],
    },

    drivingLicense: {
      type: String,
      // required: [true, "Driving License is required"],
    },
    accountNo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// booking model
export const BookingModel = model<IBooking>("Booking", bookingSchema);
