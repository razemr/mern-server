import { Router } from 'express';

export abstract class BaseRoutes {
  protected router: Router = Router();

  constructor(protected basePath: string) {}

  abstract configure(): Router;
}
