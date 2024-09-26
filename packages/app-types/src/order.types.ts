import { z } from 'zod';

import { createOrderSchema, orderSchema } from 'schemas';

export type Order = z.infer<typeof orderSchema>;

export type CreateOrderParams = z.infer<typeof createOrderSchema>;
