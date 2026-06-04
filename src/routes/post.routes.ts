import { Router } from 'express';
import { CreatePostSchema, GetPostParamSchema, GetPostsQuerySchema } from '../models/post.model.js';
import { validate } from '../middlewares/validate.js';
import {
    createPostController,
    getAllPostsController,
    getPostByIdController,
} from '../controllers/post.controller.js';

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
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort posts by creation date
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
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve a specific post by its ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post retrieved successfully!
 *                 post:
 *                   $ref: '#/components/schemas/Post'
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
router.get('/:id', validate(GetPostParamSchema, 'params'), getPostByIdController);

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
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created successfully!
 *                 post:
 *                   $ref: '#/components/schemas/Post'
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
