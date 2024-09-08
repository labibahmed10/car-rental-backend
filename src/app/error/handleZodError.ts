import { ZodError, ZodIssue } from "zod";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handelZodError = (err: ZodError): IGenericErrorResponse => {
  const statusCode = 400;

  const errorMessages: IErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path?.[issue?.path?.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error",
    errorMessages,
  };
};

export default handelZodError;
