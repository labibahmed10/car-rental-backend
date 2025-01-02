import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../utils/catchAsyncFunc";
import { TUserRole } from "../modules/User/user.interface";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import config from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../modules/User/user.model";

const authCheck = (...requiredRoles: TUserRole[]) => {
  return catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Token not found"));
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.access_token_secret as string) as JwtPayload;
    } catch (error) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid token"));
    }

    const user = await UserModel.isUserExistById(decoded.userId);
    if (!user) {
      return next(new AppError(httpStatus.NOT_FOUND, "User not found"));
    }

    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    } else {
      req.user = decoded;
      next();
    }
  });
};

export default authCheck;
