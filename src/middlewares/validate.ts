import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ZodType } from 'zod';
import { AppError } from '../utils/app-error.js';

type RequestTarget = 'body' | 'params' | 'query';

export const validate =
    (schema: ZodType, target: RequestTarget = 'body') =>
    (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            return next(
                new AppError(
                    result.error.issues.map((issue) => ({
                        field: issue.path.join('.'),
                        message: issue.message,
                    })),
                    StatusCodes.BAD_REQUEST,
                ),
            );
        }

        if (target === 'query') {
            res.locals.query = result.data;
        } else {
            req[target] = result.data;
        }
        next();
    };
