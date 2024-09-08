import httpStatus from "http-status";
import { UserServices } from "./user.services";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";

// user signup controller
const signUpUser = catchAsyncFunc(async (req, res) => {
  const { ...userData } = req.body;
  const result = await UserServices.signUpUserIntoDB(userData);

  sendResponse(res, httpStatus.CREATED, "User created successfully!", result);
});

export const UserController = {
  signUpUser,
};
