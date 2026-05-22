import dotenv from 'dotenv';

dotenv.config();

const requireEnv = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const NODE_ENV = requireEnv('NODE_ENV');
export const PORT = requireEnv('PORT');
export const CLIENT_URL = requireEnv('CLIENT_URL');
