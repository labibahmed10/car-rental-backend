import { model, Schema } from "mongoose";
import { ICar } from "./car.interface";
import { carStatus } from "./car.constant";

const carSchema = new Schema<ICar>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    color: {
      type: String,
      required: [true, "Color is required"],
    },
    isElectric: {
      type: Boolean,
      required: [true, "isElectric is required"],
    },
    status: {
      type: String,
      enum: carStatus,
      default: "available",
    },
    features: {
      type: [String],
      required: [true, "Features is required"],
    },
    pricePerHour: {
      type: Number,
      required: [true, "Price per hour is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Car = model<ICar>("Car", carSchema);
