import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";
import { userRole } from "./user.constant";
import authCheck from "../../middleware/authCheck";

const UserRoutes = express.Router();

// signup route
UserRoutes.post("/signup", validateRequest(userValidationSchema.createUserValidationSchema), UserController.signUpUser);

// signin route
UserRoutes.post("/signin", validateRequest(userValidationSchema.loginUserValidationSchema), UserController.signInUser);

// get all users- admin
UserRoutes.get("/all-users", authCheck(userRole.admin), UserController.getAllUsers);

// update status - admin
UserRoutes.patch("/user/status", authCheck(userRole.admin), UserController.updateUserStatus);

export default UserRoutes;
