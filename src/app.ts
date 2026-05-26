import './config/env.js';
import express, { type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import logger, { morganStream } from './utils/logger.js';
import { corsMiddleware } from './config/cors.js';
import { PORT } from './config/env.js';
import { swaggerDocument } from './config/swagger.js';
import connectDB from './config/database.js';
import { errorHandler } from './middlewares/error-handler.js';
import { getAppInfo } from './services/app.service.js';
import postRouter from './routes/post.routes.js';

const app = express();

await connectDB();

app.use(corsMiddleware);
app.use(morgan('dev', { stream: morganStream }));
app.use(express.json());

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        customSiteTitle: 'Tell Me Something API Docs',
        swaggerOptions: {
            operationsSorter: (
                a: { get: (key: string) => string },
                b: { get: (key: string) => string },
            ) => {
                const methodsOrder = ['get', 'post', 'put', 'patch', 'delete'];
                const methodA = a.get('method');
                const methodB = b.get('method');
                let result = methodsOrder.indexOf(methodA) - methodsOrder.indexOf(methodB);
                if (result === 0) {
                    result = a.get('path').localeCompare(b.get('path'));
                }
                return result;
            },
        },
    }),
);

/**
 * @openapi
 * /:
 *   get:
 *     summary: API server status check
 *     description: Returns server status and environment information.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppInfo'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.get('/', (req: Request, res: Response) => {
    res.send(getAppInfo());
});

app.use('/posts', postRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
    logger.info(`Docs available at http://localhost:${PORT}/docs`);
});
