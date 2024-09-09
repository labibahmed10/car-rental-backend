import express from "express";
import authCheck from "../../middleware/authCheck";
import validateRequest from "../../middleware/validateRequest";
import { userRole } from "../User/user.constant";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";

const BookingRoutes = express.Router();

BookingRoutes.post("/", authCheck(userRole.user), validateRequest(BookingValidations.bookingSetValidationSchema), BookingController.createBooking);
BookingRoutes.get("/", authCheck(userRole.admin), BookingController.getAllBooking);
BookingRoutes.get("/my-bookings", authCheck(userRole.user), BookingController.getMyBookings);
export default BookingRoutes;