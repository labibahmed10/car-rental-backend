import { Response } from "express";

const sendResponse = <T>(res: Response, statusCode: number, message: string, data: T, token?: string) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
    token,
  });
};

export default sendResponse;
