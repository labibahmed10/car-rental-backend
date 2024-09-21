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
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
    },
    type: {
      type: String,
      required: [true, "Car Type is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    isElectric: {
      type: Boolean,
      required: [true, "isElectric is required"],
    },
    status: {
      type: String,
      enum: carStatus,
      required: [true, "Status is required"],
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
    gps: {
      type: Boolean,
      default: false,
      required: false,
    },
    childSeat: {
      type: Boolean,
      default: false,
      required: false,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    availabilityDates: {
      type: [String],
      required: false,
    },
    isFeatured: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CarModel = model<ICar>("Car", carSchema);
