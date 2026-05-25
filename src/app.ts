import './config/env.js';
import express, { type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import logger, { morganStream } from './utils/logger.js';
import { corsMiddleware } from './config/cors.js';
import { PORT } from './config/env.js';
import swaggerDocument from './swagger.json' with { type: 'json' };
import connectDB from './config/database.js';
import { errorHandler } from './middlewares/error-handler.js';
import { getAppInfo } from './services/app.service.js';

const app = express();

await connectDB();

app.use(corsMiddleware);
app.use(morgan('dev', { stream: morganStream }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    res.send(getAppInfo());
});

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
    logger.info(`Docs available at http://localhost:${PORT}/docs`);
});
