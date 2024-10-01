import httpStatus from "http-status";
import { UserServices } from "./user.services";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import config from "../../config/config";
import sendNoDataFound from "../../utils/sendNoDataFound";

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

const getAllUsers = catchAsyncFunc(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  if (!result) {
    return sendNoDataFound(res);
  }
  sendResponse(res, httpStatus.OK, "Users fetched successfully", result);
});

const updateUserStatus = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await UserServices.updateUserStatusInDB(id, status);

  sendResponse(res, httpStatus.OK, "User status updated successfully", result);
});

export const UserController = {
  signUpUser,
  signInUser,
  getAllUsers,
  updateUserStatus,
};
