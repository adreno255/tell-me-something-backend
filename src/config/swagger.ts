import swaggerJsdoc, { type OAS3Options } from 'swagger-jsdoc';
import { NODE_ENV } from './env.js';

const apis =
    NODE_ENV === 'production'
        ? ['./dist/app.js', './dist/routes/*.js', './dist/models/*.js', './dist/docs/*.js']
        : ['./src/app.ts', './src/routes/*.ts', './src/models/*.ts', './src/docs/*.ts'];

const swaggerOptions: OAS3Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tell Me Something API',
            version: '1.0.0',
            description: 'Interactive API documentation for the Tell Me Something Express server',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local Development Server',
            },
            {
                url: 'https://tell-me-something-backend.onrender.com',
                description: 'Production Server',
            },
        ],
        tags: [
            { name: 'System', description: 'Entry endpoint of the API server' },
            { name: 'Posts', description: 'Post management endpoints' },
        ],
    },
    apis,
};

export const swaggerDocument = swaggerJsdoc(swaggerOptions);
