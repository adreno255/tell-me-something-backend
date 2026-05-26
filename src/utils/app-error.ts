import type { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
    public readonly statusCode: StatusCodes;
    public readonly payload: string | object;

    constructor(payload: string | object, statusCode: StatusCodes) {
        super(typeof payload === 'string' ? payload : JSON.stringify(payload));
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.payload = payload;
        Error.captureStackTrace(this, this.constructor);
    }
}
