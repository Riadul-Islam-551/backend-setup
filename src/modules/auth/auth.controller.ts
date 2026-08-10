import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const result = await authService.loginUser(email, password);

  ApiResponse.success(res, 200, "login successfully", result);
});

export const authController = {
  loginUser,
};