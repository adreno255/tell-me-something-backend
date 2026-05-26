import type { Request, Response } from 'express';
import { type CreatePostInput, type GetPostsQueryInput } from '../models/post.model.js';
import { createPost, getAllPosts } from '../services/post.service.js';

export async function getAllPostsController(req: Request, res: Response) {
    const query = req.query as unknown as GetPostsQueryInput;
    const result = await getAllPosts(query);
    res.status(200).json(result);
}

export async function createPostController(req: Request, res: Response) {
    const input = req.body as CreatePostInput;

    const post = await createPost(input);

    res.status(201).json(post);
}
