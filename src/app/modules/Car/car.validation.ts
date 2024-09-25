import { z } from "zod";
import { carStatus } from "./car.constant";

// create car validation
const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    color: z.string({
      required_error: "Color is required",
    }),
    type: z.string({
      required_error: "Car Type is required",
    }),
    year: z.string({
      required_error: "Year is required",
    }),
    image: z.string({
      required_error: "Image is required",
    }),
    isElectric: z.boolean({
      required_error: "isElectric is required",
    }),
    status: z.enum([...carStatus] as [string, ...string[]]).default("available"),
    features: z.array(
      z.string({
        required_error: "Features is required",
      })
    ),
    pricePerHour: z.number({
      required_error: "Price Per Hour is required",
    }),
    model: z.string({
      required_error: "Model is required",
    }),
    location: z.string({
      required_error: "Location is required",
    }),
    gps: z.preprocess((val) => val === true, z.boolean()),
    childSeat: z.preprocess((val) => val === true, z.boolean()),
  }),
});

// update car validation
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    type: z.string().optional(),
    year: z.string().optional(),
    image: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum([...carStatus] as [string, ...string[]]).optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().optional(),
    model: z.string().optional(),
    location: z.string().optional(),
    gps: z.preprocess((val) => val === true, z.boolean()).optional(),
    childSeat: z.preprocess((val) => val === true, z.boolean()).optional(),
  }),
});

// return car validation
const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: "Booking ID is required",
    }),
    endTime: z
      .string({
        required_error: "End Time is required",
      })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "End Time must be in HH:MM format",
      }),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
};
