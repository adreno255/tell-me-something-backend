import winston from 'winston';
import { NODE_ENV } from '../config/env.js';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'red',
    warn: 'orange',
    info: 'green',
    http: 'blue',
    debug: 'magenta',
};

const level = () => {
    if (NODE_ENV === 'development') {
        return 'debug';
    } else {
        return 'warn';
    }
};

winston.addColors(colors);

const devFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        ({ timestamp, level, message }) =>
            `[${String(timestamp)}] ${String(level).toUpperCase()}: ${String(message)}`,
    ),
    winston.format.colorize({ all: true }),
);

const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
);

const logger = winston.createLogger({
    level: level(),
    levels,
    format: process.env.NODE_ENV === 'development' ? devFormat : prodFormat,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error/log', level: 'error' }),
    ],
});

export const morganStream = {
    write: (message: string) => {
        logger.http(message.trim());
    },
};

export default logger;
