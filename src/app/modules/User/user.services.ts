import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// user signup
const signUpUserIntoDB = async (payload: IUser) => {
  const emailExist = await UserModel.findOne({ email: payload.email });
  if (emailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const result = await UserModel.create(payload);
  return result;
};  

export const UserServices = {
  signUpUserIntoDB,
};
