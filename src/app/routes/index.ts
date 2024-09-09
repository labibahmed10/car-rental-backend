import { Router } from "express";
import UserRoutes from "../modules/User/user.route";
import CarRoutes from "../modules/Car/car.route";
import BookingRoutes from "../modules/Booking/booking.route";

// route initialization
const router = Router();

// routes data
const routes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

// routes execution
routes.forEach((route) => router.use(route.path, route.route));

export default router;
