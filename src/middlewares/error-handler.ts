import type { ErrorRequestHandler } from 'express';
import { AppError } from '../utils/app-error.js';
import logger from '../utils/logger.js';

export const errorHandler: ErrorRequestHandler = (err: unknown, req, res, _next) => {
    let statusCode = 500;
    let message: string | object = 'Internal Server Error';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.payload;
    } else {
        const stack =
            err instanceof Error ? err.stack?.split('\n').slice(0, 4).join('\n') : String(err);
        logger.error(stack);
    }

    res.status(statusCode).json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.url,
        message,
    });
};
