import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";
import { IGenericErrorResponse } from "../interfaces/common";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        message: el?.message,
        path: el?.path,
      };
    }
  );
  return {
    statusCode: 400,
    success: false,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;