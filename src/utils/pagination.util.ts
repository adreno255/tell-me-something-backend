import { z } from 'zod';
import type { PaginationMeta, PaginatedResponse } from '../types/pagination.types.js';

export const PaginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
});

export type PaginationQueryInput = z.infer<typeof PaginationQuerySchema>;

export class PaginationHelper {
    static calculateMeta(page: number, limit: number, totalItems: number): PaginationMeta {
        const totalPages = Math.ceil(totalItems / limit);

        return {
            currentPage: page,
            itemsPerPage: limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
    }

    static calculateSkip(page: number, limit: number): number {
        return (page - 1) * limit;
    }

    static getMongooseOptions(query: PaginationQueryInput): { skip: number; limit: number } {
        const { page, limit } = query;
        return {
            skip: this.calculateSkip(page, limit),
            limit,
        };
    }

    static createResponse<T>(
        data: T[],
        totalItems: number,
        query: PaginationQueryInput,
    ): PaginatedResponse<T> {
        const { page, limit } = query;

        return {
            data,
            meta: this.calculateMeta(page, limit, totalItems),
        };
    }
}
