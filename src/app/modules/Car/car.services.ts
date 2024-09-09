import QueryBuilder from "../../builder/QueryBuilder";
import { carSearchableFields } from "./car.constant";
import { ICar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarsIntoDB = async (payload: ICar) => {
  const result = await CarModel.create(payload);
  return result;
};

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
  const fetchQuery = new QueryBuilder(CarModel.find(), query).search(carSearchableFields).filter().sort().paginate().selectFields();
  return fetchQuery;
};

const getCarByIdFromDB = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};

export const CarService = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getCarByIdFromDB,
};
