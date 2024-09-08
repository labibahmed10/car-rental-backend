import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// user signup
const signUpUserIntoDB = async (payload: IUser) => {
  const createdData = await UserModel.create(payload);

  console.log(createdData);
  const result = await UserModel.findById(createdData._id);
  return createdData;
};

export const UserServices = {
  signUpUserIntoDB,
};
