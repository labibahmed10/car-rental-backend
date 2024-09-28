import { z } from "zod";
import { paymentMethod } from "./booking.constant";

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string({
        required_error: "Date is required",
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format",
      })
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date",
      }),

    carId: z.string({
      required_error: "Car is required",
    }),

    startTime: z
      .string({
        required_error: "Start Time is required",
      })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Start Time must be in HH:MM format",
      }),

    nidOrPassport: z.string({
      required_error: "National ID or Passport is required",
    }),

    drivingLicense: z.string({
      required_error: "Driving License is required",
    }),

    paymentMethod: z.enum([...(paymentMethod as [string, ...string[]])]),

    accountNo: z.string().optional(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
