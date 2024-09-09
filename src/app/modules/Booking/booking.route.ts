import express from "express";
import authCheck from "../../middleware/authCheck";
import validateRequest from "../../middleware/validateRequest";
import { userRole } from "../User/user.constant";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";

const BookingRoutes = express.Router();

BookingRoutes.post("/", authCheck(userRole.user), validateRequest(BookingValidations.bookingSetValidationSchema), BookingController.createBooking);

export default BookingRoutes;
