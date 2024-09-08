import httpStatus from "http-status";
import { UserServices } from "./user.services";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import config from "../../config/config";

// user signup controller
const signUpUser = catchAsyncFunc(async (req, res) => {
  const { ...userData } = req.body;
  const result = await UserServices.signUpUserIntoDB(userData);

  sendResponse(res, httpStatus.CREATED, "User registered successfully", result);
});

// user signin controller
const signInUser = catchAsyncFunc(async (req, res) => {
  const result = await UserServices.signInUserFromDB(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, httpStatus.OK, "User logged in successfully", user, accessToken);
});

export const UserController = {
  signUpUser,
  signInUser,
};
