import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema
  .extend({
    sellerId: z.string(),
    title: z.string(),
    price: z.number(),
    image: z.string(),
    quantity: z.number(),
  })
  .strip();

export const createSchema = z.object({
  title: z.string().min(1),
  price: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
});

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),

  searchName: z.string().optional(),
  searchPrice: z
    .object({
      from: z.coerce.number(),
      to: z.coerce.number(),
    })
    .optional(),

  sort: z.enum(['asc', 'desc']).default('desc'),
});
