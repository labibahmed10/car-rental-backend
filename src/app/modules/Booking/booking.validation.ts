import { z } from "zod";

const bookingSetValidationSchema = z.object({
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
  }),
});

export const BookingValidations = {
  bookingSetValidationSchema,
};
