import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { userRegisterSchema } from "./auth.validation.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  // console.log("BODY:", req.body);
  const data = userRegisterSchema.parse(req.body);

  const result = await authService.registerUser(data);

  ApiResponse.created(res, "user registered successfully!", result);
});

export const authController = {
  registerUser,
};
