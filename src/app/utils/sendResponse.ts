import { Response } from "express";

const sendResponse = <T>(res: Response, statusCode: number, message: string, data: T) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

export default sendResponse;
