import { z } from 'zod';

import { createSchema, paginationSchema, productSchema } from 'schemas';

export type Product = z.infer<typeof productSchema>;

export type CreateParams = z.infer<typeof createSchema>;

export type DeleteParams = {
  id: string;
};

export type PaginationSchema = z.infer<typeof paginationSchema>;
