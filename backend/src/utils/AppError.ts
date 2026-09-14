export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Operational errors are predictable errors (404, 401, 400).
    // Non-operational errors are unexpected bugs (syntax error, db crash).
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}