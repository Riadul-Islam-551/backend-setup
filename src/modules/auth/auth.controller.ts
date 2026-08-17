import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import {
  userLoginSchema,
  userRegisterSchema,
  userUpdateSchema,
} from "./auth.validation.js";
import { badRequestError } from "../../utils/httpStatusError.js";

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

const updatedUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    throw badRequestError("Invalid user ID");
  }

  const data = userUpdateSchema.parse(req.body);

  const result = await authService.updateUser(id, data);

  ApiResponse.ok(res, "User updated successfully!", result);
});

const getSpecificUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    throw badRequestError("Invalid user ID");
  }

  const result = await authService.getSpecificUser(id);

  ApiResponse.ok(res, "User retrieved successfully!", result);
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.getAllUsers();

  ApiResponse.ok(res, "Users retrieved successfully!", result);
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
  updatedUser,
  getAllUsers,
  getSpecificUser,
};
