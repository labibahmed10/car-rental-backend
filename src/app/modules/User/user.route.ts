import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// signup route
router.post("/signup", UserController.signUpUser);

export const UserRoutes = router;
