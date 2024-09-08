import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsyncFunc from "../utils/catchAsyncFunc";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
