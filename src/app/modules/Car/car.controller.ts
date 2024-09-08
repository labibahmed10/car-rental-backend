import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { CarService } from "./car.services";

// create a car controller
const createCar = catchAsyncFunc(async (req, res) => {
  const result = await CarService.createCarsIntoDB(req.body);

  sendResponse(res, httpStatus.CREATED, "Car created successfully", result);
});

export const CarController = {
  createCar,
};
