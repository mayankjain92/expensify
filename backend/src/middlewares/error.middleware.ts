import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If it's our known operational error (404, 400, etc.)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // If it's an unexpected bug/crash (DB down, programming error)
  console.error("💥 UNEXPECTED ERROR:", err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong on our end",
  });
};