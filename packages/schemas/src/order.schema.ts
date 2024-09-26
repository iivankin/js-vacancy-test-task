import { OrderStatus } from 'enums';
import { z } from 'zod';

import dbSchema from './db.schema';

export const orderSchema = dbSchema
  .extend({
    buyerId: z.string(),
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
        // At the time of the purcache
        title: z.string(),
        price: z.number(),
        image: z.string(),
      }),
    ),
    // Updates after stripe
    completedAt: z.date().optional(),
    status: z.nativeEnum(OrderStatus),
    session: z.string(),
  })
  .strip();

export const createOrderSchema = z.object({
  data: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    }),
  ),
});
