import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import { Server } from 'http';
import mongoose from 'mongoose';

import { Application } from './application';
import { log } from '@services/log.service';

class AppServer {
  httpServer: Server;
  httpTerminator: HttpTerminator;

  constructor(private app: Application) {
    this.httpServer = this.app.start();
    this.httpTerminator = createHttpTerminator({
      server: this.httpServer,
    });
  }

  async exit(code: number, timeout: number = 5000) {
    try {
      log.debug(`Attempting a graceful shutdown with code ${code}`);

      setTimeout(() => {
        log.warn(`Forcing a shutdown with code ${code}`);
        process.exit(code);
      }, timeout).unref();

      if (this.httpServer.listening) {
        log.debug('Terminating HTTP connections');
        await this.httpTerminator.terminate();
      }

      log.debug('Closing database connection');
      await mongoose.connection.close();

      log.debug(`Exiting gracefully with code ${code}`);
      process.exit(code);
    } catch (error) {
      log.error('Error shutting down gracefully');
      log.error((error as Error).message);
      log.debug(`Forcing exit with code ${code}`);
      process.exit(code);
    }
  }
}

export const server = new AppServer(new Application());

process.on('SIGTERM', () => {
  log.debug(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
  server.exit(0);
});

process.on('SIGINT', () => {
  log.debug(`Process ${process.pid} received SIGINT: Exiting with code 0`);
  server.exit(0);
});

process.on('unhandledRejection', (reason: Error | any) => {
  log.warn(`Unhandled Rejection: ${reason.message || reason}`);

  throw new Error(reason.message || reason);
});

process.on('uncaughtException', (error: Error) => {
  log.error(`Application encountered a critical error: ${error.message}`);
  server.exit(1);
});

//Run server --Done--
//Clean environment --Done--
//Configure logging --Done--
//Ensure async error handling works in Express --Done--

//Implement Signup with JWT tokens (refresh and access)
//Configure passport authentication
//Add input validation
//Add log rotation to Winston
