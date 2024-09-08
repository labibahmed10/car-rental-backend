import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";

const UserRoutes = express.Router();

// signup route
UserRoutes.post("/signup", validateRequest(userValidationSchema.createUserValidationSchema), UserController.signUpUser);

// signin route
UserRoutes.post("/signin", validateRequest(userValidationSchema.loginUserValidationSchema), UserController.signInUser);

export default UserRoutes;
