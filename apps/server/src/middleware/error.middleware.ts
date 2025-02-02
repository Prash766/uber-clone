import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ApiError from "../utils/ApiError";

const errorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 400;
  let message = "Internal Server Error";
  let errors;
  if (err instanceof z.ZodError) {
      process.env.NODE_ENV === "production"
        ? (message = err.errors[0].message)
        : (errors = err.errors.map((error) => ({
            field: error.path.join("."),
            message: error.message,
          })));
  }

  if (err instanceof ApiError) {
    (message = err.message), (status = err.statusCode);
  }

   res.status(status).json({
    success: false,
    message,
    errors,
  });status
};

export default errorMiddleware


