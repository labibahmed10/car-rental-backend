import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { calculateHourDifference, carSearchableFields } from "./car.constant";
import { ICar, ICarReturn } from "./car.interface";
import { CarModel } from "./car.model";
import { BookingModel } from "../Booking/booking.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const createCarsIntoDB = async (payload: ICar) => {
  const result = await CarModel.create(payload);
  return result;
};

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
  const fetchQuery = new QueryBuilder(CarModel.find({ isDeleted: false }), query)
    .search(carSearchableFields)
    .filter()
    .filterByTypes()
    .filterByAvailabilityDates()
    .filterByIsElectric()
    .filterByLocation()
    .filterByPrice()
    .select()
    .sort()
    .paginate().modelQuery;

  return fetchQuery;
};

const getCarByIdFromDB = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<ICar>) => {
  // console.log(id, payload?.data);
  const result = await CarModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return result;
};

const deleteCarFromDB = async (id: string) => {
  const result = await CarModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

const returnTheCarFromDB = async (payload: ICarReturn) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // update booking end time
    const updateEndTime = await BookingModel.findByIdAndUpdate(
      { _id: payload.bookingId },
      { endTime: payload.endTime },
      { new: true, runValidators: true, session }
    );
    if (!updateEndTime) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update end time");
    }

    // update car availability
    const car = await CarModel.findByIdAndUpdate(
      { _id: updateEndTime?.car?._id },
      { status: "available" },
      { new: true, runValidators: true, session }
    );

    const pricePerHour = car?.pricePerHour;
    const totalCost = Number(pricePerHour) * calculateHourDifference(updateEndTime.startTime, updateEndTime.endTime);

    const result = await BookingModel.findByIdAndUpdate(
      { _id: payload.bookingId },
      { totalCost: totalCost, status: "completed" },
      { new: true, runValidators: true, session }
    )
      .populate("user")
      .populate("car");

    await session.commitTransaction();

    return result;
  } catch (error: unknown) {
    await session.abortTransaction();
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    throw new AppError(httpStatus.BAD_REQUEST, errorMessage);
  } finally {
    await session.endSession();
  }
};

export const CarService = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getCarByIdFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnTheCarFromDB,
};
