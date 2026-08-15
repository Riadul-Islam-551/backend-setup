import HttpStatus from "http-status-codes";
import AppError from "./appError.js";

export const conflictError = (message: string) => {
  return AppError(HttpStatus.CONFLICT, message);
};

export const badRequestError = (message: string) => {
  return AppError(HttpStatus.BAD_REQUEST, message);
};

export const unauthorizedError = (message: string) => {
  return AppError(HttpStatus.UNAUTHORIZED, message);
};

export const forbiddenError = (message: string) => {
  return AppError(HttpStatus.FORBIDDEN, message);
};

export const notFoundError = (message: string) => {
  return AppError(HttpStatus.NOT_FOUND, message);
};