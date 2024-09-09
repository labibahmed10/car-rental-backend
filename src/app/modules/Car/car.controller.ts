import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { CarService } from "./car.services";

// create a car controller
const createCar = catchAsyncFunc(async (req, res) => {
  const result = await CarService.createCarsIntoDB(req.body);

  sendResponse(res, httpStatus.CREATED, "Car created successfully", result);
});

const getAllCars = catchAsyncFunc(async (req, res) => {
  const fetchQuery = await CarService.getAllCarsFromDB(req.query);
  const result = await fetchQuery.modelQuery;
  sendResponse(res, httpStatus.OK, "Cars fetched successfully", result);
});

const getCarById = catchAsyncFunc(async (req, res) => {
  const result = await CarService.getCarByIdFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, "A Car retrieved successfully", result);
});

export const CarController = {
  createCar,
  getAllCars,
  getCarById,
};
