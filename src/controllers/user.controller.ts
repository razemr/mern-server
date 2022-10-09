import { Request, Response } from 'express';

import { BaseController } from './base.controller';

export class UserController extends BaseController {
  signUp = (req: Request, res: Response) => {
    this.success(res, req.body);
  };

  logout = () => {
    this.error(new Error());
  };
}
