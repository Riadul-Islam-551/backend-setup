import type { Response } from "express";

const apiResponse = (res: Response, data: any, message: string) => {
  res.json({
    success: true,
    message,
    data,
  });
};

export default apiResponse;
