import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorMessage[] => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        message: el?.message,
        path: el?.path,
      };
    }
  );
  return errors;
};

export default handleValidationError;
