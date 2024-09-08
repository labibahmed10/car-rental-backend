import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

// signup route
router.post("/signup", validateRequest(userValidationSchema.createUserValidationSchema), UserController.signUpUser);

export const UserRoutes = router;
