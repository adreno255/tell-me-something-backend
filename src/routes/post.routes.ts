import { Router } from 'express';
import { CreatePostSchema, GetPostsQuerySchema } from '../models/post.model.js';
import { validate } from '../middlewares/validate.js';
import { createPostController, getAllPostsController } from '../controllers/post.controller.js';

const router = Router();

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a paginated list of posts with optional filtering by recipient name.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: recipient
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by recipient name
 *     responses:
 *       200:
 *         description: Paginated list of posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedPostsResponse'
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', validate(GetPostsQuerySchema, 'query'), getAllPostsController);

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a post
 *     description: Create a new post with the provided details.
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       201:
 *         description: Post created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validate(CreatePostSchema), createPostController);

export default router;
