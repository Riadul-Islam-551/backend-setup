import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse.js";

const globalError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "something went wrong !";

  return ApiResponse.error(res, statusCode, message, error);
};

export default globalError;
