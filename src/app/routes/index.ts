import { Router } from "express";
import UserRoutes from "../modules/User/user.route";
import CarRoutes from "../modules/Car/car.route";

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
];

// routes execution
routes.forEach((route) => router.use(route.path, route.route));

export default router;
