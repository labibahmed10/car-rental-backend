import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import createToken from "../../utils/createToken";
import config from "../../config/config";

// user signup
const signUpUserIntoDB = async (payload: IUser) => {
  const emailExist = await UserModel.findOne({ email: payload.email });
  if (emailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const result = await UserModel.create(payload);
  return result;
};

// user signin
const signInUserFromDB = async (payload: Pick<IUser, "email" | "password">) => {
  const user = await UserModel.isUserExistByEmail(payload.email as string);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No user exist");
  }

  const isPasswordMatched = await UserModel.isPasswordMatched(payload.password as string, user.password as string);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password not matched");
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload, config.access_token_secret as string, config.access_token_expires_in as string);
  const refreshToken = createToken(jwtPayload, config.refresh_token_secret as string, config.refresh_token_expires_in as string);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const getAllUsersFromDB = async () => {
  const users = await UserModel.find({});
  return users;
};

export const UserServices = {
  signUpUserIntoDB,
  signInUserFromDB,
  getAllUsersFromDB,
};
