import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { CarService } from "./car.services";
import sendNoDataFound from "../../utils/sendNoDataFound";

// create a car controller
const createCar = catchAsyncFunc(async (req, res) => {
  const result = await CarService.createCarsIntoDB(req.body);

  sendResponse(res, httpStatus.CREATED, "Car created successfully", result);
});

const getAllCars = catchAsyncFunc(async (req, res) => {
  const result = await CarService.getAllCarsFromDB(req.query);
  
  if (!result || result.length === 0) {
    sendNoDataFound(res);
  }

  sendResponse(res, httpStatus.OK, "Cars fetched successfully", result);
});

const getCarById = catchAsyncFunc(async (req, res) => {
  const result = await CarService.getCarByIdFromDB(req.params.id);

  if (!result) {
    sendNoDataFound(res);
  }

  sendResponse(res, httpStatus.OK, "A Car retrieved successfully", result);
});

const updateCar = catchAsyncFunc(async (req, res) => {
  const result = await CarService.updateCarIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, "Car updated successfully", result);
});

const deleteCar = catchAsyncFunc(async (req, res) => {
  const result = await CarService.deleteCarFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, "Car deleted successfully", result);
});

const returnTheCar = catchAsyncFunc(async (req, res) => {
  const result = await CarService.returnTheCarFromDB(req.body);
  sendResponse(res, httpStatus.OK, "Car returned successfully", result);
});

export const CarController = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  returnTheCar,
};
