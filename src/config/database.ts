import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { MONGODB_URI } from './env.js';

async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI);

        logger.info(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        logger.error('MongoDB connection failed:', { error });
        process.exit(1);
    }
}

export default connectDB;
