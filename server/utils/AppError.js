/**
 * Custom application error class for operational errors.
 * Allows controllers to `throw new AppError('message', 404)` and have it
 * handled uniformly by the centralized error middleware.
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
