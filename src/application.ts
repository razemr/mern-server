import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';

import { UserRoutes } from '@routes/user.routes';
import { env } from '@utils/environment';
import { log } from '@services/log.service';
import { ApiError } from '@utils/error';
import { ApiResponse } from '@utils/response';

export class Application {
  private server: express.Application;

  constructor() {
    this.server = express();
    this.configureServer();
    this.configureRoutes();
    this.configureErrorHandler();
  }

  private configureServer() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: {
          write: message => log.http(message.trim()),
        },
        skip: () => env.isProduction,
      }),
    );
  }

  private configureRoutes() {
    this.server.use(new UserRoutes('/users').configure());
  }

  private configureErrorHandler() {
    this.server.use(
      (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
      ) => {
        if (err instanceof ApiError) {
          log.error(err.message, err.rawErrors);

          return res
            .status(err.statusCode)
            .json(ApiResponse.Error(err.message, err.rawErrors));
        }

        log.error(err.message);

        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(ApiResponse.Error('Internal server error'));
      },
    );
  }

  start() {
    return this.server.listen(env.PORT, () => {
      log.info(`Server running on port ${env.PORT}`);
    });
  }
}
