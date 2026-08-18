import type { Response } from "express";
import HttpStatus from "http-status-codes";
import { env } from "../config/env.js";

const success = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

const error = (
  res: Response,
  statusCode: number,
  message: string,
  error: any,
) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(env.nodeEnv === "development" && { stack: error.stack }),
  });
};

// Reusable success responses
const created = (
  res: Response,
  message: string,
  data?: any,
) => {
  return success(res, HttpStatus.CREATED, message, data);
};

const ok = (
  res: Response,
  message: string,
  data?: any,
) => {
  return success(res, HttpStatus.OK, message, data);
};

const noContent = (
  res: Response,
  message: string = "",
) => {
  return success(res, HttpStatus.NO_CONTENT, message);
};

export const ApiResponse = {
  success,
  error,
  created,
  ok,
  noContent,
};