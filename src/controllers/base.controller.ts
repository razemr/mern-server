import { Response } from 'express';
import { ApiResponse } from '../utils/response';

export class BaseController {
  public success = (res: Response, data?: any, message?: string): void => {
    res.status(200).json(ApiResponse.Success(data, message));
  };

  //Error will be handled by error handler middleware
  public error = (error: Error): void => {
    throw error;
  };
}
