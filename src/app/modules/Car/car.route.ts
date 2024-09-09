import express from "express";
import { CarValidations } from "./car.validation";
import validateRequest from "../../middleware/validateRequest";
import { CarController } from "./car.controller";
import authCheck from "../../middleware/authCheck";
import { userRole } from "../User/user.constant";

const CarRoutes = express.Router();

// create car
CarRoutes.post("/", authCheck(userRole.admin), validateRequest(CarValidations.createCarValidationSchema), CarController.createCar);
CarRoutes.get("/", authCheck(userRole.admin, userRole.user), CarController.getAllCars);
CarRoutes.put("/return", authCheck(userRole.admin), validateRequest(CarValidations.returnCarValidationSchema), CarController.returnTheCar);

CarRoutes.get("/:id", authCheck(userRole.admin, userRole.user), CarController.getCarById);
CarRoutes.put("/:id", authCheck(userRole.admin), validateRequest(CarValidations.updateCarValidationSchema), CarController.updateCar);
CarRoutes.delete("/:id", authCheck(userRole.admin), CarController.deleteCar);

export default CarRoutes;
