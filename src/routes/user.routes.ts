import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { BaseRoutes } from './base.routes';

export class UserRoutes extends BaseRoutes {
  private userController: UserController = new UserController();

  constructor(basePath: string) {
    super(basePath);
  }

  configure(): Router {
    this.router.post(this.basePath + '/sign-up', this.userController.signUp);

    return this.router;
  }
}
