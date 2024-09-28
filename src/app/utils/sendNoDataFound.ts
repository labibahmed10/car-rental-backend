import { Response } from "express";
import httpStatus from "http-status";

const sendNoDataFound = (res: Response) => {
  return res.status(httpStatus.OK).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "No Data Found",
    data: [],
  });
};

export default sendNoDataFound;
