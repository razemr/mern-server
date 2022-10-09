import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { UserRoutes } from '@routes/user.routes';
import { env } from '@utils/environment';
import { Logger } from '@services/logging';
import { ApiError } from '@utils/error';
import { ApiResponse } from '@utils/response';

require('express-async-errors');

export class Application {
  private server: express.Application;

  constructor() {
    this.server = express();
    this.configureServer();
    this.configureRoutes();
    this.configureErrorHandlers();
  }

  private configureServer() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: {
          write: message => Logger.http(message.trim()),
        },
        skip: () => env.isProduction,
      }),
    );
  }

  private configureRoutes() {
    this.server.use(new UserRoutes('/users').configure());
  }

  private configureErrorHandlers() {
    this.server.use(
      (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
      ) => {
        if (err instanceof ApiError) {
          Logger.error(err.message, err.rawErrors);

          return res
            .status(err.statusCode)
            .json(ApiResponse.Error(err.message, err.rawErrors));
        }

        Logger.error(err.message);

        return res.status(500).json(ApiResponse.Error(err.message));
      },
    );
  }

  start() {
    this.server.listen(env.PORT, () => {
      Logger.info(`Server running on port ${env.PORT}`);
    });
  }
}
