import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.services";

const createBooking = catchAsyncFunc(async (req, res) => {
  const userID = req.user?.userId;
  const bookingInfo = req.body;
  const result = await BookingService.createBookingIntroDb(userID, bookingInfo);

  sendResponse(res, httpStatus.OK, "Car booked successfully", result);
});

export const BookingController = { createBooking };
