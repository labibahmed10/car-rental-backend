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

const getAllBooking = catchAsyncFunc(async (req, res) => {
  const result = await BookingService.getAllBookingFromDb(req.query);

  sendResponse(res, httpStatus.OK, "Bookings retrieved successfully", result);
});

const getMyBookings = catchAsyncFunc(async (req, res) => {
  const userID = req.user?.userId;
  const result = await BookingService.getMyBookingsFromDb(userID);

  sendResponse(res, httpStatus.OK, "My bookings retrieved successfully", result);
});

export const BookingController = { createBooking, getAllBooking, getMyBookings };
