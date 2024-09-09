import { Response } from "express";
import httpStatus from "http-status";

const sendNoDataFound = (res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
};

export default sendNoDataFound;
