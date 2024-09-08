import mongoose from "mongoose";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
  const errorMessages: IErrorSources[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorMessages,
  };
};

export default handleCastError;
