import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import httpStatus from "http-status";
import { IErrorSources } from "../interface/error";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import handelZodError from "../error/handleZodError";
import AppError from "../error/AppError";
import config from "../config/config";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR as number;
  let message = "Something went wrong";

  let errorMessages: IErrorSources[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // handle zod, mongoose (validation, cast, 11000 - duplicate error), AppError and Error
  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else 
  if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else 
  if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else 
  if (err.name==="MongoServerError" || err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else 
  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else 
  if (err instanceof Error) {
    message = err?.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
