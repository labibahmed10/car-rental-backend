import { ICar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarsIntoDB = async (payload: ICar) => {
  const result = await CarModel.create(payload);
  return result;
};

export const CarService = {
  createCarsIntoDB,
};
