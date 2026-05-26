import { Schema, model } from 'mongoose';
import { z } from 'zod';
import { PaginationQuerySchema } from '../utils/pagination.util.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         recipient:
 *           type: string
 *           minLength: 1
 *           maxLength: 20
 *         content:
 *           type: string
 *           minLength: 1
 *           maxLength: 4000
 *         signature:
 *           type: string
 *           minLength: 1
 *           maxLength: 20
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreatePostInput:
 *       type: object
 *       required:
 *         - recipient
 *         - content
 *         - signature
 *       properties:
 *         recipient:
 *           type: string
 *           minLength: 1
 *           maxLength: 20
 *         content:
 *           type: string
 *           minLength: 1
 *           maxLength: 4000
 *         signature:
 *           type: string
 *           minLength: 1
 *           maxLength: 20
 *
 *     PaginatedPostsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'
 *         meta:
 *           $ref: '#/components/schemas/PaginationMeta'
 */

// Zod Schema

export const GetPostsQuerySchema = PaginationQuerySchema.extend({
    recipient: z.string().optional(),
});

export const CreatePostSchema = z.object({
    recipient: z.string().min(1).max(20),
    content: z.string().min(1).max(4000),
    signature: z.string().min(1).max(20),
});

export type GetPostsQueryInput = z.infer<typeof GetPostsQuerySchema>;
export type CreatePostInput = z.infer<typeof CreatePostSchema>;

// Mongoose Schema

const postSchema = new Schema<CreatePostInput>(
    {
        recipient: { type: String, required: true },
        content: { type: String, required: true },
        signature: { type: String, required: true },
    },
    { timestamps: true },
);

export const Post = model<CreatePostInput>('Post', postSchema);
