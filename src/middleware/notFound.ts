import type { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Api not found",
    error: {
      path: req.originalUrl,
      message: "request path is not found",
    },
  });
};

export default notFound;
