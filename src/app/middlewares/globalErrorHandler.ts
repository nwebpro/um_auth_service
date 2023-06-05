/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config/index';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiErrors';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('Global Error Handler', error)
    : errorLogger.error('Global Error Handler', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedErrors = handleValidationError(error);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorMessages = simplifiedErrors.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedErrors = handleZodError(error);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorMessages = simplifiedErrors.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
