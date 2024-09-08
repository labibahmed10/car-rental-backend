import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// user signup
const signUpUserIntoDB = async (payload: IUser) => {
  const createdData = await UserModel.create(payload);
  return createdData;
};

export const UserServices = {
  signUpUserIntoDB,
};
