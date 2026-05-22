import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

type RequestTarget = 'body' | 'params' | 'query';

export const validate =
    (schema: ZodType, target: RequestTarget = 'body') =>
    (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            res.status(400).json({ errors: result.error.flatten() });
            return;
        }

        req[target] = result.data;
        next();
    };
