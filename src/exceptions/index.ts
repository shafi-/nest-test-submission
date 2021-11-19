export class AppError extends Error {
  statusCode = 500

  constructor(msg, statusCode = 500) {
    super();
    this.message = msg;
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}
