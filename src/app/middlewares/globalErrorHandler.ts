import { NextFunction, Request, Response } from "express";
import config from "../../config/index";
import { IGenericErrorMessage } from "../../interfaces/error";
// import handleValidationError from '../../errors/handleValidationError';

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = "Something went wrong";
  const errorMessages: IGenericErrorMessage[] = [];

  // if(err?.name === 'ValidationError') {
  // 	const simplifiedErrors = handleValidationError(err);
  // }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? err.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
