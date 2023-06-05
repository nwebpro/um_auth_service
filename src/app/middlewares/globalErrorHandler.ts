import { NextFunction, Request, Response } from "express";
import config from "../../config/index";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiErrors";
import { error } from "winston";
import { Error } from "mongoose";

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    const simplifiedErrors = handleValidationError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorMessages = simplifiedErrors.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? err.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
