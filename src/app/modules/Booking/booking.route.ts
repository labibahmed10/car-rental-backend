import express from "express";
import authCheck from "../../middleware/authCheck";
import validateRequest from "../../middleware/validateRequest";
import { userRole } from "../User/user.constant";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";

const BookingRoutes = express.Router();

// create a booking - user
BookingRoutes.post("/", authCheck(userRole.user), validateRequest(BookingValidations.createBookingValidationSchema), BookingController.createBooking);

// get all bookings - admin
BookingRoutes.get("/", authCheck(userRole.admin), BookingController.getAllBooking);

// individual booking of user - user
BookingRoutes.get("/my-bookings", authCheck(userRole.user), BookingController.getMyBookings);

// cancel booking - admin (might give access to user)
BookingRoutes.put("/:id", authCheck(userRole.admin), BookingController.cancelABooking);

// update a single booking - admin | user
BookingRoutes.put("/updateBooking/:id", authCheck(userRole.admin, userRole.user), BookingController.updateABooking);

export default BookingRoutes;
