import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

const login = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = authService.loginUser(email, password);
  } catch (error) {}
};

export const authController = {
  login,
};
