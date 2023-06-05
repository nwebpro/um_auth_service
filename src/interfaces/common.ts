import { IGenericErrorMessage } from "./error";

export interface IGenericErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
}
