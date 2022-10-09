import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public rawErrors: string[] = [],
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(path: string) {
    super(StatusCodes.NOT_FOUND, `The requested path ${path} not found!`);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(StatusCodes.BAD_REQUEST, message, errors);
  }
}

export class ServerError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, errors);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized!') {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
