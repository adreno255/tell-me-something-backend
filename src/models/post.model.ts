import { Schema, model } from 'mongoose';
import { z } from 'zod';

// Zod Schema

export const CreatePostSchema = z.object({
    recepient: z.string().min(1).max(20),
    content: z.string().min(1).max(4000),
    signature: z.string().min(1).max(20),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

// Mongoose Schema

const postSchema = new Schema<CreatePostInput>({
    recepient: { type: String, required: true },
    content: { type: String, required: true },
    signature: { type: String, required: true },
});

export const Post = model<CreatePostInput>('Post', postSchema);
