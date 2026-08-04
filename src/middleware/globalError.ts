import type { NextFunction, Request, Response } from "express";

const globalError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: error.message || "something went wrong",
  });
};

export default globalError;
