import './config/env.js';
import express, { type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import logger, { morganStream } from './utils/logger.js';
import { corsMiddleware } from './config/cors.js';
import { NODE_ENV, PORT } from './config/env.js';
import swaggerDocument from './swagger.json' with { type: 'json' };
import { readFileSync } from 'fs';
import { join } from 'path';
import connectDB from './config/database.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

await connectDB();

app.use(corsMiddleware);
app.use(morgan('dev', { stream: morganStream }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    type PackageJson = {
        version: string;
    };

    function readPackageVersion(): string {
        try {
            const raw = readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
            const pkg = JSON.parse(raw) as PackageJson;
            return pkg.version ?? 'unknown';
        } catch {
            return 'unknown';
        }
    }

    res.send({
        name: 'Tell-Me-Something API Server',
        status: 'ok',
        environment: NODE_ENV ?? 'development',
        version: readPackageVersion(),
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
    logger.info(`Docs available at http://localhost:${PORT}/docs`);
});
