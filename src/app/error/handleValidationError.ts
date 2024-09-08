import mongoose from "mongoose";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): IGenericErrorResponse => {
  const errorMessages: IErrorSources[] = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages,
  };
};

export default handleValidationError;
