import { Post, type CreatePostInput, type GetPostsQueryInput } from '../models/post.model.js';
import type { PaginatedResponse } from '../types/pagination.types.js';
import { PaginationHelper } from '../utils/pagination.util.js';

export async function getAllPosts(
    query: GetPostsQueryInput,
): Promise<PaginatedResponse<typeof Post.prototype>> {
    const { recipient } = query;
    const filter = recipient ? { recipient } : {};

    const [data, totalItems] = await Promise.all([
        Post.find(filter)
            .skip(PaginationHelper.getMongooseOptions(query).skip)
            .limit(PaginationHelper.getMongooseOptions(query).limit),
        Post.countDocuments(filter),
    ]);

    return PaginationHelper.createResponse(data, totalItems, query);
}

export async function createPost(input: CreatePostInput) {
    const post = await Post.create(input);

    return {
        message: 'Post created successfully!',
        post,
    };
}
