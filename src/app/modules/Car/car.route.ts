import express from "express";
import { CarValidations } from "./car.validation";
import validateRequest from "../../middleware/validateRequest";
import { CarController } from "./car.controller";
import authCheck from "../../middleware/authCheck";

const CarRoutes = express.Router();

// create car
CarRoutes.post("/", authCheck("admin"), validateRequest(CarValidations.createCarValidationSchema), CarController.createCar);
CarRoutes.get("/", CarController.getAllCars);


export default CarRoutes;
