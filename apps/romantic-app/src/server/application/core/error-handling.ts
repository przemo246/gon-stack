abstract class BaseError extends Error {
  abstract type: string;
  abstract code: number;
  abstract message: string;

  abstract json(): {
    code: number;
    type: string;
    message: string;
  };
}

export class BadRequest extends BaseError {
  type = 'bad-request' as const;
  code = 400 as const;
  message = 'Bad Request';

  static is = (error: unknown): error is BadRequest => {
    return error instanceof BadRequest;
  };

  json = () => ({
    code: this.code,
    type: this.type,
    message: this.message,
  });
}

export class Unauthorized extends BaseError {
  type = 'unauthorized' as const;
  code = 401 as const;
  message = 'Unauthorized';

  static is = (error: unknown): error is Unauthorized => {
    return error instanceof Unauthorized;
  };

  json = () => ({
    code: this.code,
    type: this.type,
    message: this.message,
  });
}

export class Forbidden extends BaseError {
  type = 'forbidden' as const;
  code = 403 as const;
  message = 'Forbidden';

  static is = (error: unknown): error is Forbidden => {
    return error instanceof Forbidden;
  };

  json = () => ({
    code: this.code,
    type: this.type,
    message: this.message,
  });
}

export class NotFound extends BaseError {
  type = 'not-found' as const;
  code = 404 as const;
  message = 'Not Found';

  static is = (error: unknown): error is NotFound => {
    return error instanceof NotFound;
  };

  json = () => ({
    code: this.code,
    type: this.type,
    message: this.message,
  });
}

export class InternalServer extends BaseError {
  type = 'internal-server-error' as const;
  code = 500 as const;
  message = 'Internal Server Error';

  static is = (error: unknown): error is InternalServer => {
    return error instanceof InternalServer;
  };

  json = () => ({
    code: this.code,
    type: this.type,
    message: this.message,
  });
}

export class ServiceUnavailable extends BaseError {
  type = 'service-unavailable' as const;
  code = 503 as const;
  message = 'Service Unavailable';

  static is = (error: unknown): error is ServiceUnavailable => {
    return error instanceof ServiceUnavailable;
  };

  json = () => ({
    code: this.code,
    type: this.type,
    message: this.message,
  });
}

export class GatewayTimeout extends BaseError {
  type = 'gateway-timeout' as const;
  code = 504 as const;
  message = 'Gateway Timeout';

  static is = (error: unknown): error is GatewayTimeout => {
    return error instanceof GatewayTimeout;
  };

  json = () => ({
    code: this.code,
    type: this.type,
    message: this.message,
  });
}

export type AllErrors =
  | BadRequest
  | Unauthorized
  | Forbidden
  | NotFound
  | InternalServer
  | ServiceUnavailable
  | GatewayTimeout;

export abstract class APIError {
  static is = (error: unknown): error is AllErrors => {
    return error instanceof BaseError;
  };
}
