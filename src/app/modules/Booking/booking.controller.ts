import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.services";
import sendNoDataFound from "../../utils/sendNoDataFound";

const createBooking = catchAsyncFunc(async (req, res) => {
  const userID = req.user?.userId;
  const bookingInfo = req.body;
  const result = await BookingService.createBookingIntroDb(userID, bookingInfo);

  sendResponse(res, httpStatus.OK, "Car booked successfully", result);
});

const getAllBooking = catchAsyncFunc(async (req, res) => {
  const result = await BookingService.getAllBookingFromDb(req.query);

  if (result.length === 0) {
    return sendNoDataFound(res);
  }
  sendResponse(res, httpStatus.OK, "Bookings retrieved successfully", result);
});

const getMyBookings = catchAsyncFunc(async (req, res) => {
  const userID = req.user?.userId;
  const result = await BookingService.getMyBookingsFromDb(userID);

  if (!result || result.length === 0) {
    return sendNoDataFound(res);
  }

  sendResponse(res, httpStatus.OK, "My bookings retrieved successfully", result);
});

const cancelABooking = catchAsyncFunc(async (req, res) => {
  const id = req.params?.id;
  const result = await BookingService.cancelABookingFromDB(id);

  sendResponse(res, httpStatus.OK, "Booking Canceled Successfully", result);
});

const updateABooking = catchAsyncFunc(async (req, res) => {
  const id = req.params?.id;
  const bookingInfo = req.body;
  const result = await BookingService.updateABookingInDB(id, bookingInfo);

  sendResponse(res, httpStatus.OK, "Booking updated successfully", result);
});

const updateBookingStatus = catchAsyncFunc(async (req, res) => {
  const id = req.params?.id;
  const status = req.body.status;
  const result = await BookingService.updateBookingStatusInDB(id, status);

  sendResponse(res, httpStatus.OK, "Booking status updated successfully", result);
});

export const BookingController = { createBooking, getAllBooking, getMyBookings, cancelABooking, updateABooking, updateBookingStatus };
