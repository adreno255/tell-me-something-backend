import cors, { type CorsOptions } from 'cors';
import { CLIENT_URL } from './env.js';

const corsOptions: CorsOptions = {
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
