import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";
import { getErrorMessage } from "../utils";

// Based on https://www.youtube.com/watch?v=EUYnERcOGpA
export default function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent || process.env.DEBUG === "true") {
    next(error);
    return;
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error });
    return;
  }

  res.status(500).json({
    error: {
      message: getErrorMessage(error) || "An error occurred. Please view logs for more details."
    }
  })
}
