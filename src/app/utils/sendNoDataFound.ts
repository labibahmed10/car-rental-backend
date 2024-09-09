import { Response } from "express";

const sendNoDataFound = (res: Response) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
};

export default sendNoDataFound;
