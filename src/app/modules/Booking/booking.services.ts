import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { CarModel } from "../Car/car.model";
import { carBookingStatus } from "./booking.constant";
import { IBookingPayload } from "./booking.interface";
import mongoose, { Types } from "mongoose";
import { BookingModel } from "./booking.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createBookingIntroDb = async (userID: string, payload: IBookingPayload) => {
  const carID = payload.carId;

  const isCarExist = await CarModel.findOne({
    _id: carID,
    isDeleted: false,
    status: carBookingStatus.available,
  });
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Car does not exist for booking");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const [booking] = await BookingModel.create([{ ...payload, car: carID, user: userID }], {
      validateBeforeSave: true,
      session,
      runValidators: true,
    });

    const updateCarStatusResult = await CarModel.findByIdAndUpdate(
      carID,
      { status: carBookingStatus.unavailable },
      { new: true, runValidators: true, session }
    );
    if (!updateCarStatusResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update car status");
    }

    const bookingId = booking?._id;

    await session.commitTransaction();
    await session.endSession();

    const result = await BookingModel.findById({ _id: bookingId }).populate("user").populate("car");
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error instanceof Error ? error.message : "An unknown error occurred");
  }
};

const getAllBookingFromDb = async (query: Record<string, unknown>) => {
  if (query.carId) {
    query.car = query.carId;
    delete query.carId;
  }

  const queryBuilder = new QueryBuilder(BookingModel.find({}).populate("user").populate("car"), query)
    .search([])
    .filter()
    .sort()
    .paginate();

  const result = await queryBuilder.modelQuery;
  return result;
};

const getMyBookingsFromDb = async (userID: string) => {
  const result = await BookingModel.find({ user: new Types.ObjectId(userID) })
    .populate("user")
    .populate("car");
  return result;
};

export const BookingService = { createBookingIntroDb, getAllBookingFromDb, getMyBookingsFromDb };
