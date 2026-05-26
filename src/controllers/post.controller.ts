import type { Request, Response } from 'express';
import { type CreatePostInput, type GetPostsQueryInput } from '../models/post.model.js';
import { createPost, getAllPosts, getPostById } from '../services/post.service.js';

export async function getAllPostsController(req: Request, res: Response) {
    const query = res.locals.query as GetPostsQueryInput;
    const result = await getAllPosts(query);
    res.status(200).json(result);
}

export async function getPostByIdController(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const result = await getPostById(id);
    res.status(200).json(result);
}

export async function createPostController(req: Request, res: Response) {
    const input = req.body as CreatePostInput;

    const post = await createPost(input);

    res.status(201).json(post);
}
