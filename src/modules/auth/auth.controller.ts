import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

const login = (req: Request, res: Response) => {
  const { name, email } = req.body();

  const result = authService.loginUser();

  if (result.user.name === name && result.user.email === email) {
    res.json({
      success: true,
      data: result,
    });
  }
};

export const authController = {
  login,
};
