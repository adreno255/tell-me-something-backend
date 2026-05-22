import type { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: StatusCodes) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
