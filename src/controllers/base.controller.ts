import { Response } from 'express';
import { ApiResponse } from '../utils/response';
import { log } from '@services/log.service';

export class BaseController {
  public success = (res: Response, data?: any, message?: string): void => {
    log.debug('');
    res.status(200).json(ApiResponse.Success(data, message));
  };

  //Error will be handled by error handler middleware
  public error = (error: Error): void => {
    throw error;
  };
}
