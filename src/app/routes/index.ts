import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";

// route initialization
const router = Router();

// routes data
const routes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
];

// routes execution
routes.forEach((route) => router.use(route.path, route.route));

export default router;
