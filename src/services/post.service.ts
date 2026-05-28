import { StatusCodes } from 'http-status-codes';
import { Post, type CreatePostInput, type GetPostsQueryInput } from '../models/post.model.js';
import type { PaginatedResponse } from '../types/pagination.types.js';
import { AppError } from '../utils/app-error.js';
import { PaginationHelper } from '../utils/pagination.util.js';

export async function getAllPosts(
    query: GetPostsQueryInput,
): Promise<PaginatedResponse<typeof Post.prototype>> {
    const { recipient } = query;
    const filter = recipient ? { recipient: { $regex: `^${recipient}`, $options: 'i' } } : {};

    const [data, totalItems] = await Promise.all([
        Post.find(filter)
            .skip(PaginationHelper.getMongooseOptions(query).skip)
            .limit(PaginationHelper.getMongooseOptions(query).limit),
        Post.countDocuments(filter),
    ]);

    return PaginationHelper.createResponse(data, totalItems, query);
}

export async function getPostById(id: string) {
    const post = await Post.findById(id);

    if (!post) {
        throw new AppError('Post not found', StatusCodes.NOT_FOUND);
    }

    return {
        message: 'Post retrieved successfully!',
        post,
    };
}

export async function createPost(input: CreatePostInput) {
    const post = await Post.create(input);

    return {
        message: 'Post created successfully!',
        post,
    };
}
