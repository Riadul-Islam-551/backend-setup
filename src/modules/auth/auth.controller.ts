import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { userLoginSchema, userRegisterSchema } from "./auth.validation.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  // console.log("BODY:", req.body);
  const data = userRegisterSchema.parse(req.body);

  const result = await authService.registerUser(data);

  ApiResponse.created(res, "user registered successfully!", result);
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  // console.log("BODY:", req.body);
  const data = userLoginSchema.parse(req.body);

  const result = await authService.loginUser(data);

  ApiResponse.ok(res, "user login successfully!", result);
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  // console.log("BODY:", req.body);
  const { id } = req.body;

  const result = await authService.deleteUser(id);

  ApiResponse.ok(res, "user deleted successfully!", result);
});

export const authController = {
  loginUser,
  registerUser,
  deleteUser,
};
