/**
 * @openapi
 * components:
 *   schemas:
 *     AppInfo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Tell Me Something API Server
 *         status:
 *           type: string
 *           example: ok
 *         environment:
 *           type: string
 *           example: development
 *         version:
 *           type: string
 *           example: 1.0.0
 *
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *         itemsPerPage:
 *           type: integer
 *         totalItems:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         hasNextPage:
 *           type: boolean
 *         hasPreviousPage:
 *           type: boolean
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 000
 *         timestamp:
 *           type: string
 *           format: date-time
 *         path:
 *           type: string
 *           example: /endpoint-path
 *         message:
 *           type: string
 *           example: Specific error message describing what went wrong
 */
